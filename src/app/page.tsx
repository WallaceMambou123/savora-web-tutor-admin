"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Globe, Briefcase, Calculator, Code, Palette, BookOpen, Users, Clock, ArrowRight, Check } from 'lucide-react';

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Données des catégories
  const categories = [
    { id: 1, name: 'Business', icon: Briefcase, color: 'bg-purple-100', textColor: 'text-purple-600', courses: '52,933 Courses' },
    { id: 2, name: 'Finance & Accounting', icon: Calculator, color: 'bg-green-100', textColor: 'text-green-600', courses: '12,345 Courses' },
    { id: 3, name: 'IT & Software', icon: Code, color: 'bg-blue-100', textColor: 'text-blue-600', courses: '45,678 Courses' },
    { id: 4, name: 'Design', icon: Palette, color: 'bg-pink-100', textColor: 'text-pink-600', courses: '23,456 Courses' },
    { id: 5, name: 'Marketing', icon: Globe, color: 'bg-yellow-100', textColor: 'text-yellow-600', courses: '34,567 Courses' },
    { id: 6, name: 'Development', icon: Code, color: 'bg-indigo-100', textColor: 'text-indigo-600', courses: '67,890 Courses' },
    { id: 7, name: 'Photography', icon: BookOpen, color: 'bg-red-100', textColor: 'text-red-600', courses: '15,234 Courses' },
    { id: 8, name: 'Music', icon: BookOpen, color: 'bg-orange-100', textColor: 'text-orange-600', courses: '8,901 Courses' },
    { id: 9, name: 'Health & Fitness', icon: BookOpen, color: 'bg-teal-100', textColor: 'text-teal-600', courses: '19,876 Courses' },
  ];

  // Données des cours
  const bestSellingCourses = [
    { id: 1, title: 'Machine Learning A-Z™: Hands-On Python & R In Data...', category: 'DESIGN', price: '$57', rating: 5.0, students: '265.7k' },
    { id: 2, title: 'The Complete Web Development Bootcamp', category: 'DEVELOPMENT', price: '$49', rating: 4.9, students: '189.3k' },
    { id: 3, title: 'Python for Data Science and Machine Learning', category: 'IT & SOFTWARE', price: '$64', rating: 4.8, students: '156.2k' },
    { id: 4, title: 'The Complete Digital Marketing Course', category: 'MARKETING', price: '$45', rating: 4.7, students: '234.5k' },
    { id: 5, title: 'Advanced React & Redux', category: 'DEVELOPMENT', price: '$52', rating: 4.9, students: '98.7k' },
    { id: 6, title: 'UI/UX Design Masterclass', category: 'DESIGN', price: '$58', rating: 4.8, students: '145.6k' },
    { id: 7, title: 'Complete SQL Bootcamp', category: 'IT & SOFTWARE', price: '$39', rating: 4.6, students: '178.9k' },
    { id: 8, title: 'JavaScript: The Complete Guide', category: 'DEVELOPMENT', price: '$47', rating: 4.9, students: '201.4k' },
  ];

  const featureCourses = [
    { id: 1, title: 'Complete Python Bootcamp From Zero to Hero', instructor: 'Kevin Gilbert', rating: 5.0, reviews: 57914, students: '265.7k', level: 'Beginner', duration: '6 hour', price: '$14.00', originalPrice: '$95.00', discount: 85 },
    { id: 2, title: 'The Complete Web Developer Course 2.0', instructor: 'Rob Percival', rating: 4.9, reviews: 45231, students: '189.3k', level: 'Intermediate', duration: '8 hour', price: '$19.00', originalPrice: '$99.00', discount: 81 },
    { id: 3, title: 'Angular - The Complete Guide', instructor: 'Maximilian Schwarzmüller', rating: 4.8, reviews: 38945, students: '156.2k', level: 'Advanced', duration: '10 hour', price: '$24.00', originalPrice: '$89.00', discount: 73 },
  ];

  const instructors = [
    { id: 1, name: 'Devon Lane', title: 'Senior Developer', rating: 4.8, students: '834', bgColor: 'bg-yellow-100' },
    { id: 2, name: 'Jane Cooper', title: 'UI/UX Designer', rating: 4.9, students: '1.2k', bgColor: 'bg-gray-100' },
    { id: 3, name: 'Robert Fox', title: 'Data Scientist', rating: 4.7, students: '956', bgColor: 'bg-purple-100' },
    { id: 4, name: 'Cameron Williamson', title: 'Full Stack Developer', rating: 4.8, students: '1.1k', bgColor: 'bg-green-100' },
  ];

  const companies = ['Netflix', 'YouTube', 'Google', 'Lenovo', 'Slack', 'Verizon', 'Lexmark', 'Microsoft'];

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500 font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-[var(--color-text)]">
              Learn with expert anytime anywhere
            </h1>
            <p className="text-lg text-[var(--color-text)]/70 mb-8 max-w-2xl">
              Our mission is to help people to find the best course online and learn with expert anytime, anywhere.
            </p>
            <Link href="/register">
              <button className="bg-savoora-primary text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-savoora-primary/90 transition-colors">
                Create Account
              </button>
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <Image
                src="/images/accueilTemplate.png"
                alt="Learning illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Browse top category */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--color-text)]">Browse top category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.slice(0, 9).map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className={`${category.color} p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow`}
              >
                <IconComponent className={`${category.textColor} w-12 h-12 mb-4`} />
                <h3 className="font-semibold text-lg mb-2 text-[var(--color-text)]">{category.name}</h3>
                <p className="text-sm text-[var(--color-text)]/70">{category.courses}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <Link href="/categories" className="text-savoora-primary font-medium hover:underline inline-flex items-center gap-2">
            We have more category & subcategory. Browse All <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Best selling courses */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--color-text)]">Best selling courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellingCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[var(--color-bg)] border border-savoora-light rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-200 to-blue-200">
                <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold text-[var(--color-text)]">
                  {course.category}
                </span>
                <span className="absolute top-2 right-2 bg-savoora-primary text-white px-3 py-1 rounded font-semibold">
                  {course.price}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-[var(--color-text)] line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{course.rating}</span>
                </div>
                <p className="text-sm text-[var(--color-text)]/70">{course.students} students</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our feature courses */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--color-text)]">Our feature courses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featureCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[var(--color-bg)] border border-savoora-light rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 bg-gradient-to-br from-orange-200 to-red-200 flex-shrink-0" />
                <div className="p-6 flex-1">
                  <h3 className="font-bold text-xl mb-2 text-[var(--color-text)]">{course.title}</h3>
                  <p className="text-sm text-[var(--color-text)]/70 mb-3">by {course.instructor}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{course.rating}</span>
                    <span className="text-sm text-[var(--color-text)]/70">({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text)]/70 mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {course.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <span>{course.level}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-savoora-primary">{course.price}</span>
                    <span className="text-lg text-[var(--color-text)]/50 line-through">{course.originalPrice}</span>
                    <span className="text-sm font-semibold text-savoora-primary">{course.discount}% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently added courses */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--color-text)]">Recently added courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featureCourses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="bg-[var(--color-bg)] border border-savoora-light rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
              onMouseEnter={() => setSelectedCourse(course.id)}
              onMouseLeave={() => setSelectedCourse(null)}
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-200 to-indigo-200">
                <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold text-[var(--color-text)]">
                  DEVELOPMENT
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-[var(--color-text)]">{course.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{course.rating}</span>
                </div>
                <p className="text-sm text-[var(--color-text)]/70">{course.students} students</p>
              </div>

              {/* Panneau de détails au survol */}
              {selectedCourse === course.id && (
                <div className="absolute inset-0 bg-white rounded-lg shadow-2xl p-6 z-10 overflow-y-auto">
                  <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                  <p className="text-sm text-[var(--color-text)]/70 mb-4">by {course.instructor}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold">{course.rating}</span>
                    <span className="text-sm text-[var(--color-text)]/70">({course.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text)]/70 mb-4">
                    <span>{course.students} students</span>
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold text-savoora-primary">{course.price}</span>
                    <span className="text-lg text-[var(--color-text)]/50 line-through">{course.originalPrice}</span>
                    <span className="text-sm font-semibold text-savoora-primary">{course.discount}% OFF</span>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">WHAT YOU'LL LEARN</h4>
                    <ul className="space-y-2 text-sm">
                      {['Master Python programming', 'Build real-world projects', 'Understand data structures', 'Learn best practices'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check size={16} className="text-savoora-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-savoora-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-savoora-primary/90 transition-colors">
                      Add To Cart
                    </button>
                    <button className="flex-1 border-2 border-savoora-primary text-savoora-primary px-4 py-2 rounded-md font-semibold hover:bg-savoora-primary/10 transition-colors">
                      Course Detail
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/courses">
            <button className="bg-savoora-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-savoora-primary/90 transition-colors inline-flex items-center gap-2">
              Browse All Course <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </section>

      {/* Become an instructor */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-savoora-primary rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
          <div className="flex-1 text-white z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Become an instructor</h2>
            <p className="text-lg mb-6 opacity-90">
              Top instructors from around the world teach millions of students on Savoora. We provide the tools and skills to teach what you love.
            </p>
            <Link href="/instructor">
              <button className="bg-white text-savoora-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                Start Teaching <ArrowRight size={20} />
              </button>
            </Link>
          </div>
          <div className="flex-1 relative z-10">
            <div className="relative w-full h-64 lg:h-80">
              <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm" />
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 backdrop-blur-sm z-0" />
        </div>

        {/* Étapes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Apply to become instructor', description: 'Submit your application' },
            { step: '2', title: 'Build & edit your profile', description: 'Create your instructor profile' },
            { step: '3', title: 'Create your new course', description: 'Start teaching your expertise' },
            { step: '4', title: 'Start teaching & earning', description: 'Share knowledge and earn' },
          ].map((item) => (
            <div key={item.step} className="bg-[var(--color-bg)] border border-savoora-light rounded-lg p-6">
              <div className="w-12 h-12 bg-savoora-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[var(--color-text)]">{item.title}</h3>
              <p className="text-sm text-[var(--color-text)]/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top instructor of the month */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-[var(--color-text)]">Top instructor of the month</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-[var(--color-bg)] border border-savoora-light rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`${instructor.bgColor} w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center`}>
                <Users size={40} className="text-[var(--color-text)]/50" />
              </div>
              <h3 className="font-semibold text-lg mb-1 text-[var(--color-text)]">{instructor.name}</h3>
              <p className="text-sm text-[var(--color-text)]/70 mb-3">{instructor.title}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold">{instructor.rating}</span>
              </div>
              <p className="text-sm text-[var(--color-text)]/70">{instructor.students} students</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted companies */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)]">6.3k trusted companies</h2>
        <p className="text-[var(--color-text)]/70 mb-8 max-w-2xl">
          Join thousands of companies that trust Savoora for their team's learning and development needs.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white border border-savoora-light rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <span className="text-lg font-semibold text-[var(--color-text)]/70">{company}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="bg-[var(--color-savoora-dark)] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Start learning with 67.1k students around the world.</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <button className="bg-savoora-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-savoora-primary/90 transition-colors">
                  Join The Family
                </button>
              </Link>
              <Link href="/courses">
                <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
                  Browse All Courses
                </button>
              </Link>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">6.3k</div>
              <div className="text-lg opacity-90">Online courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">26k</div>
              <div className="text-lg opacity-90">Certified Instructor</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
