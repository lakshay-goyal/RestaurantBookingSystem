"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
]

export default function Reservations() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ date, time, guests, name, email, phone, specialRequests })
    setStep(5) // Move to confirmation step
  }

  return (
    <div className="max-w-2xl mx-auto m-9">
      <h2 className="text-3xl font-bold mb-6 text-center">Make a Reservation</h2>
      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Select Date and Time</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mb-4 mx-auto w-2/5"
          />
          <Select onValueChange={setTime} value={time}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="mt-4" onClick={() => setStep(2)}>Next</Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Number of Guests</h3>
          <Select onValueChange={(value) => setGuests(parseInt(value))} value={guests.toString()}>
            <SelectTrigger className="w-full">
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
          <Button className="mt-4" onClick={() => setStep(3)}>Next</Button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Table Selection</h3>
          <p>Available tables for {guests} guests on {format(date, 'MMMM d, yyyy')} at {time}:</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button onClick={() => setStep(4)}>Table 1 (Window)</Button>
            <Button onClick={() => setStep(4)}>Table 2 (Center)</Button>
            <Button onClick={() => setStep(4)}>Table 3 (Bar)</Button>
            <Button onClick={() => setStep(4)}>Table 4 (Window)</Button>
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
          <Button type="submit" className="mt-6">Confirm Reservation</Button>
        </form>
      )}
      {step === 5 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Reservation Confirmed</h3>
          <p>Thank you for your reservation, {name}!</p>
          <p>Your booking reference is: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p>We look forward to seeing you on {format(date, 'MMMM d, yyyy')} at {time}.</p>
        </div>
      )}
    </div>
  )
}
