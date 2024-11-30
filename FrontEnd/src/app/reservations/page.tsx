"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "FrontEnd/src/components/ui/button"
import { Input } from "FrontEnd/src/components/ui/input"
import { Label } from "FrontEnd/src/components/ui/label"
import { Calendar } from "FrontEnd/src/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "FrontEnd/src/components/ui/select"
import { Textarea } from "FrontEnd/src/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "FrontEnd/src/components/ui/card"
import { format } from 'date-fns'
import { jsPDF } from 'jspdf'
import { Download, Calendar as CalendarIcon, UserIcon, ClockIcon, TicketIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import QRCode from 'qrcode'

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
]

interface ReservationProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const Reservations: React.FC = () => {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [bookingReference, setBookingReference] = useState("")
  const [selectedTable, setSelectedTable] = useState("")
  const [product, setProduct] = useState<ReservationProduct | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const productDetails = {
      id: Number(searchParams.get('productId')),
      name: searchParams.get('productName') || '',
      price: Number(searchParams.get('productPrice')),
      imageUrl: searchParams.get('productImage') || ''
    };
    setProduct(productDetails);
  }, [searchParams]);

  const generateBookingReference = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  const handleDownloadPDF = async () => {
    if (!bookingReference) {
      alert("Booking reference is missing. Please try again.");
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;

      // Header with gradient
      doc.setFillColor(0, 0, 0);
      doc.rect(0, 0, pageWidth, 60, "F");

      // Restaurant Logo/Name
      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("ELEGANT DINING", pageWidth / 2, 25, { align: "center" });

      // Subtitle
      doc.setFontSize(14);
      doc.setFont("helvetica", "italic");
      doc.text("Your premier dining experience", pageWidth / 2, 35, { align: "center" });

      // Booking Reference
      doc.setFontSize(16);
      doc.text(`Booking Reference: ${bookingReference}`, pageWidth / 2, 50, { align: "center" });

      // Main content
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Reservation details
      const startY = 80;
      const lineHeight = 10;

      const details = [
        `Name: ${name}`,
        `Date: ${date ? format(date, "MMMM d, yyyy") : "N/A"}`,
        `Time: ${time}`,
        `Guests: ${guests}`,
        `Table: ${selectedTable}`,
        `Email: ${email}`,
        `Phone: ${phone}`
      ];

      details.forEach((detail, index) => {
        doc.text(detail, margin, startY + (lineHeight * index));
      });

      // Product section
      if (product) {
        const productStartY = startY + (lineHeight * (details.length + 2));
        
        doc.setFont("helvetica", "bold");
        doc.text("Selected Menu Item:", margin, productStartY);
        doc.setFont("helvetica", "normal");
        doc.text(product.name, margin, productStartY + lineHeight);
        doc.text(`$${product.price.toFixed(2)}`, margin, productStartY + (lineHeight * 2));

        try {
          // Generate QR Code
          const productUrl = `${window.location.origin}/details?id=${product.id}`;
          const qrCodeDataUrl = await QRCode.toDataURL(productUrl);

          // Add QR Code
          const qrSize = 30;
          const qrX = pageWidth - margin - qrSize;
          const qrY = pageHeight - margin - qrSize;

          // White background for QR code
          doc.setFillColor(255, 255, 255);
          doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4, "F");

          // Add QR code
          doc.addImage(
            qrCodeDataUrl,
            'PNG',
            qrX,
            qrY,
            qrSize,
            qrSize
          );

          // "Scan for details" text
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text(
            "Scan for details",
            qrX + (qrSize / 2),
            qrY + qrSize + 5,
            { align: "center" }
          );

          // Try to add product image if available
          if (product.imageUrl) {
            try {
              const response = await fetch(product.imageUrl);
              const blob = await response.blob();
              
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64data = reader.result as string;
                
                // Add product image
                doc.addImage(
                  base64data,
                  'JPEG',
                  margin,
                  productStartY + (lineHeight * 3),
                  50,
                  50
                );
                
                // Save PDF after image is added
                doc.save(`elegant_dining_reservation_${bookingReference}.pdf`);
              };
              
              reader.readAsDataURL(blob);
            } catch (imageError) {
              console.error("Error adding product image:", imageError);
              // Save PDF even if image fails
              doc.save(`elegant_dining_reservation_${bookingReference}.pdf`);
            }
          } else {
            // Save PDF if no image
            doc.save(`elegant_dining_reservation_${bookingReference}.pdf`);
          }
        } catch (qrError) {
          console.error("Error generating QR code:", qrError);
          // Save PDF even if QR code fails
          doc.save(`elegant_dining_reservation_${bookingReference}.pdf`);
        }
      } else {
        // Save PDF if no product
        doc.save(`elegant_dining_reservation_${bookingReference}.pdf`);
      }

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const reference = generateBookingReference()
    setBookingReference(reference)
    setStep(5)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center">
      <Card className="w-full shadow-2xl border-2 border-gray-300 hover:shadow-4xl transition-all duration-300">
        <CardHeader className="bg-black text-white py-6">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center space-x-3">
            <TicketIcon className="w-10 h-10 text-white" />
            <span>Make a Reservation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-gray-800">
                <CalendarIcon className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Select Date and Time</h3>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-gray-300 mx-auto w-full max-w-sm shadow-lg"
              />
              <Select onValueChange={setTime} value={time}>
                <SelectTrigger className="w-full border-gray-300">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800 transition-colors" 
                onClick={() => time && setStep(2)}
                disabled={!time}
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <UserIcon className="w-6 h-6" />
                <span>Number of Guests</span>
              </h3>
              <Select 
                onValueChange={(value) => setGuests(parseInt(value))} 
                value={guests.toString()}
              >
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                className="mt-4 w-full bg-black text-white hover:bg-gray-800"
                onClick={() => setStep(3)}
              >
                Next
              </Button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Table Selection</h3>
              <p>Available tables for {guests} guests on {date ? format(date, 'MMMM d, yyyy') : 'N/A'} at {time}:</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button 
                  onClick={() => {
                    setSelectedTable("Table 1 (Window)")
                    setStep(4)
                  }}
                >
                  Table 1 (Window)
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedTable("Table 2 (Center)")
                    setStep(4)
                  }}
                >
                  Table 2 (Center)
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedTable("Table 3 (Bar)")
                    setStep(4)
                  }}
                >
                  Table 3 (Bar)
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedTable("Table 4 (Window)")
                    setStep(4)
                  }}
                >
                  Table 4 (Window)
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl font-semibold mb-4">Your Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-6 w-full">Confirm Reservation</Button>
            </form>
          )}

          {step === 5 && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-green-600">Reservation Confirmed!</h2>
              
              <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-md">
                <p className="mb-2">Thank you, <strong>{name}</strong>!</p>
                <p>Booking Reference: <strong>{bookingReference}</strong></p>
                <p>Date: {date ? format(date, 'MMMM d, yyyy') : 'N/A'}</p>
                <p>Time: {time}</p>
                <p>Table: {selectedTable}</p>
                {product && (
                  <>
                    <div className="mt-4 pt-4 border-t">
                      <h3 className="font-semibold">Selected Item:</h3>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded mx-auto my-2"
                      />
                      <p>{product.name}</p>
                      <p className="font-semibold">${product.price.toFixed(2)}</p>
                    </div>
                  </>
                )}
              </div>

              <Button 
                onClick={handleDownloadPDF}
                className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-2"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Reservation PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Reservations;