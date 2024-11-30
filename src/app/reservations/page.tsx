"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { jsPDF } from 'jspdf'
import { Download, Calendar as CalendarIcon, UserIcon, ClockIcon, TicketIcon } from 'lucide-react'

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
]

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

  const generateBookingReference = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase()
  }


  // const handleDownloadPDF = () => {
  //   if (!bookingReference) {
  //     alert("Booking reference is missing. Please try again.");
  //     return;
  //   }
  
  //   const doc = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'mm',
  //     format: 'a4'
  //   });
  
  //   // Simulate background gradient
  //   const width = 210; // A4 width in mm
  //   const height = 297; // A4 height in mm
  //   const steps = 100; // Gradient resolution
  
  //   for (let i = 0; i < steps; i++) {
  //     const colorValue = Math.floor((255 / steps) * i);
  //     const gradientColor = `rgb(${255 - colorValue}, ${255 - colorValue}, 255)`; // lightblue to white
  //     doc.setFillColor(gradientColor);
  //     doc.rect(0, (height / steps) * i, width, height / steps, 'F');
  //   }
  
  //   // Restaurant Logo (Placeholder)
  //   doc.setFontSize(20);
  //   doc.setTextColor(0, 102, 204);
  //   doc.text("ELEGANT DINING", 105, 30, { align: 'center' });
  
  //   // Decorative Line
  //   doc.setLineWidth(0.5);
  //   doc.setDrawColor(0, 102, 204);
  //   doc.line(20, 40, 190, 40);
  
  //   // Reservation Details
  //   doc.setFontSize(16);
  //   doc.setTextColor(0, 0, 0);
  //   doc.text("Reservation Confirmation", 105, 50, { align: 'center' });
  
  //   // Details Table
  //   const detailsY = 70;
  //   doc.setFontSize(12);
  //   doc.text(`Name: ${name || 'N/A'}`, 30, detailsY);
  //   doc.text(`Email: ${email || 'N/A'}`, 30, detailsY + 10);
  //   doc.text(`Phone: ${phone || 'N/A'}`, 30, detailsY + 20);
  //   doc.text(`Date: ${date ? format(date, "MMMM d, yyyy") : 'N/A'}`, 30, detailsY + 30);
  //   doc.text(`Time: ${time || 'N/A'}`, 30, detailsY + 40);
  //   doc.text(`Guests: ${guests || 'N/A'}`, 30, detailsY + 50);
  //   doc.text(`Table: ${selectedTable || 'N/A'}`, 30, detailsY + 60);
  //   doc.text(`Booking Ref: ${bookingReference}`, 30, detailsY + 70);
  
  //   // Special Requests
  //   if (specialRequests) {
  //     doc.text("Special Requests:", 30, detailsY + 90);
  //     doc.text(specialRequests, 30, detailsY + 100, { maxWidth: 150 });
  //   }
  
  //   // Footer
  //   doc.setFontSize(10);
  //   doc.setTextColor(100);
  //   doc.text(
  //     "Thank you for choosing Elegant Dining. We look forward to serving you!",
  //     105,
  //     280,
  //     { align: 'center' }
  //   );
  
  //   // Save PDF
  //   doc.save(`reservation_${bookingReference}.pdf`);
  // };
  

  const handleDownloadPDF = () => {
    if (!bookingReference) {
      alert("Booking reference is missing. Please try again.");
      return;
    }
  
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 20;
  
    // Header Section with Light Gradient
    doc.setFillColor(200, 230, 255); // Light blue
    doc.rect(0, 0, pageWidth, 50, "F");
  
    // Restaurant Logo and Name
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 153); // Dark blue
    doc.setFont("helvetica", "bold");
    doc.text("ELEGANT DINING", pageWidth / 2, 30, { align: "center" });
  
    // Subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Your premier destination for fine dining", pageWidth / 2, 38, { align: "center" });
  
    // Decorative Line
    doc.setDrawColor(0, 51, 153); // Dark blue
    doc.setLineWidth(0.5);
    doc.line(margin, 45, pageWidth - margin, 45);
  
    // Reservation Confirmation Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Reservation Confirmation", pageWidth / 2, 60, { align: "center" });
  
    // Add Reservation Details in a Professional Layout
    const detailsStartY = 80;
    const lineSpacing = 8;
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
  
    const details = [
      { label: "Name", value: String(name || "N/A") },
      { label: "Email", value: String(email || "N/A") },
      { label: "Phone", value: String(phone || "N/A") },
      { label: "Date", value: String(date ? format(date, "MMMM d, yyyy") : "N/A") },
      { label: "Time", value: String(time || "N/A") },
      { label: "Guests", value: String(guests || "N/A") },
      { label: "Table", value: String(selectedTable || "N/A") },
      { label: "Booking Ref", value: String(bookingReference || "N/A") },
    ];
    
  
    details.forEach((detail, index) => {
      const y = detailsStartY + index * lineSpacing;
      doc.text(`${detail.label}:`, margin, y);
      doc.setTextColor(50, 50, 50); // Neutral dark gray
      doc.text(detail.value, margin + 40, y);
      doc.setTextColor(0, 0, 0); // Reset to black
    });
  
    // Special Requests Section
    if (specialRequests) {
      const specialRequestsY = detailsStartY + details.length * lineSpacing + 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Special Requests:", margin, specialRequestsY);
  
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50); // Neutral dark gray
      doc.text(specialRequests, margin, specialRequestsY + 8, { maxWidth: pageWidth - 2 * margin });
    }
  
    // Footer Section with Gradient
    doc.setFillColor(220, 240, 255); // Very light blue
    doc.rect(0, pageHeight - 30, pageWidth, 30, "F");
  
    // Footer Text
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(0, 102, 204); // Bright blue
    doc.text(
      "Thank you for choosing Elegant Dining. We look forward to serving you!",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" }
    );
  
    // Save PDF
    doc.save(`reservation_${bookingReference}.pdf`);
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