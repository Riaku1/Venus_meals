// File Name: pages/index.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Utensils, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function VenusLandingPage() {
  const [meals, setMeals] = useState([]);

  // Fetch dynamic menu items from Supabase
  useEffect(() => {
    async function fetchMeals() {
      const { data } = await supabase.from('meals').select('*').eq('is_active', true);
      if (data) setMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9] font-sans selection:bg-emerald-100">
      <Head>
        <title>Venus Meals Enterprise Ltd | Institutional Catering Excellence</title>
      </Head>

      {/* Hero Section with Animated Transitions */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-900">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070')] bg-cover bg-center"
        />
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest text-emerald-400 uppercase bg-emerald-950/50 rounded-full border border-emerald-800"
          >
            Established 2012 • Kampala, Uganda
          </motion.span>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Nutritious Meals. <br /><span className="text-emerald-400 italic font-light text-4xl md:text-6xl">Excellence Delivered.</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-emerald-50/80 mb-10"
          >
            Providing high-quality institutional catering for organizations like Makerere University and Brookside Ltd.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg shadow-2xl hover:bg-emerald-400 transition"
          >
            Explore Our Services
          </motion.button>
        </div>
      </section>

      {/* Dynamic Catalog Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-serif font-bold text-emerald-950 mb-4">Our Culinary Catalog</h2>
            <div className="h-1 w-20 bg-emerald-500" />
          </div>
          <p className="text-gray-500 italic max-w-sm mt-4 md:mt-0">
            Tailored meal plans designed to maximize organizational productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <AnimatePresence>
            {meals.map((meal: any) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={meal.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={meal.image_url || '/placeholder-meal.jpg'} 
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2 block">{meal.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{meal.name}</h3>
                  <p className="text-gray-500 text-sm">{meal.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-emerald-950 text-emerald-50 py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Venus Meals Enterprise Ltd</h3>
            <p className="text-emerald-200/60 leading-relaxed">Professional catering firm providing affordable, nutritious meal solutions to institutions across Uganda.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold mb-4 border-b border-emerald-800 pb-2">Direct Contact</h4>
            <div className="flex items-center gap-3"><Phone size={18} className="text-emerald-400" /> 0774 651655 / 0752 267367</div>
            <div className="flex items-center gap-3"><Mail size={18} className="text-emerald-400" /> venus2018@gmail.com</div>
          </div>
          <div>
            <h4 className="font-bold mb-4 border-b border-emerald-800 pb-2">Compliance</h4>
            <p className="text-emerald-200/60">TIN: 1013297707</p>
            <p className="text-emerald-200/60 mt-2 italic text-sm">Inco-operated Limited Liability Company since 2018.</p>
          </div>
        </div>
      </footer>
    </div>
  );
      }
