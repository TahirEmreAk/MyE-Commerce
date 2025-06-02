import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const offices = [
    {
      city: 'Paris',
      address: '1901 Thorn ridge Cir.',
      postalCode: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'New York',
      address: '2715 Ash Dr. San Jose,',
      postalCode: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'Berlin',
      address: '4140 Parker Rd.',
      postalCode: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    },
    {
      city: 'London',
      address: '3517 W. Gray St. Utica,',
      postalCode: '75000 Paris',
      phone: '+451 215 215',
      fax: '+451 215 215'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-400 text-white">
        <div className="max-w-[1320px] mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CONTACT US</h1>
            <p className="text-lg mb-8">
              Problems trying to resolve the conflict between 
              the two major realms of Classical physics: 
              Newtonian mechanics
            </p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* Questions & Answers Section */}
      <section className="bg-gray-50">
        <div className="max-w-[1320px] mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Get answers to all your questions.
              </h2>
              <p className="text-gray-600">
                Problems trying to resolve the conflict between 
                the two major realms of Classical physics:
              </p>
              <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
                CONTACT OUR COMPANY
              </button>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/images/contact-chair.jpg" 
                alt="Modern chair" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-400 text-white">
        <div className="max-w-[1320px] mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Visit our office
              </h2>
              <p>
                Problems trying to resolve the conflict between 
                the two major realms of Classical physics: 
                Newtonian mechanics
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offices.map((office, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-bold">{office.city}</h3>
                  <div className="space-y-2">
                    <p>{office.address}</p>
                    <p>{office.postalCode}</p>
                  </div>
                  <div className="space-y-2">
                    <p>Phone: {office.phone}</p>
                    <p>Fax: {office.fax}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section className="bg-blue-500 text-white">
        <div className="max-w-[1320px] mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="text-sm font-bold">WORK WITH US</span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Now Let's grow Yours
              </h2>
              <p>
                The gradual accumulation of information about atomic and 
                small-scale behavior during the first quarter of the 20th
              </p>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-500 transition-colors">
                Button
              </button>
            </div>
            <div className="hidden md:block">
              <img 
                src="/images/contact-fashion.jpg" 
                alt="Fashion model" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 