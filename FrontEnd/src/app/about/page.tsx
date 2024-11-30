"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Award, Users, Heart } from 'lucide-react';
import { Card, CardContent } from "FrontEnd/src/components/ui/card";

// Import images
import Lakshay from "../assets/Lakshay.png";
import Jaanya from "../assets/Jaanya.jpeg";
import Piyush from "../assets/Piyush.jpeg";

const teamMembers = [
  {
    name: "Lakshay Goyal",
    role: "Web Developer",
    image: Lakshay,
    description: "MERN and DevOps Developer | Data Science Learner"
  },
  {
    name: "Jaanya Raheja",
    role: "Backend Developer",
    image: Jaanya,
    description: "Data Enthusiast | SQL | Python | PowerBI"
  },
  {
    name: "Piyush Chokker",
    role: "Project Researcher",
    image: Piyush,
    description: "DSAI Sophomore at K.R. Mangalam University"
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url("/restaurant-interior.jpg")' }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 text-white">Our Story</h1>
            <p className="text-xl max-w-2xl mx-auto text-gray-200">
              A journey of passion, flavor, and culinary excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section - Moved above */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our talented team of culinary experts brings passion and creativity to every dish
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={member.image.src}
                        alt={member.name}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 leading-relaxed">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">The Gourmet Haven Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2010, Gourmet Haven began with a simple vision: to create an extraordinary dining experience that celebrates the art of fine cuisine while maintaining the warmth of traditional hospitality.
            </p>
            <p className="text-lg text-gray-600">
              Over the years, we've grown from a small family restaurant into one of the city's most beloved culinary destinations, earning recognition for our innovative menu and exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ChefHat className="w-12 h-12 text-primary" />,
                title: "Culinary Excellence",
                description: "We pursue perfection in every dish, using only the finest ingredients and innovative techniques."
              },
              {
                icon: <Heart className="w-12 h-12 text-primary" />,
                title: "Passion for Service",
                description: "Our dedication to exceptional service ensures every guest feels special and valued."
              },
              {
                icon: <Award className="w-12 h-12 text-primary" />,
                title: "Quality First",
                description: "We never compromise on quality, from ingredients to presentation and service."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-all">
                  <CardContent className="flex flex-col items-center space-y-4">
                    {value.icon}
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "12+", label: "Years of Excellence" },
              { number: "50+", label: "Team Members" },
              { number: "1000+", label: "Happy Customers" },
              { number: "100+", label: "Signature Dishes" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
