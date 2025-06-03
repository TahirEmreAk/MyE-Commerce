import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: '15K', label: 'Happy Customers' },
    { number: '150K', label: 'Monthly Visitors' },
    { number: '15', label: 'Countries Worldwide' },
    { number: '100+', label: 'Top Partners' }
  ];

  const teamMembers = [
    {
      name: 'Gökhan Özdemir',
      role: 'Project Manager',
      image: '/images/team/gokhanozdemir.jpg'
    },
    {
      name: 'Tahir Emre AK',
      role: 'Full Stack Developer',
      image: '/images/team/tahir.jpg'
    },
    {
      name: 'Hasan Erdem AK',
      role: 'Full Stack Developer',
      image: '/images/team/erdem.jpg'
    }
  ];

  const workPrinciples = [
    {
      title: 'Easy Wins',
      description: 'Get your best looking smile now!',
      image: '/images/about/work-1.jpg'
    },
    {
      title: 'Concrete',
      description: 'Defalcate is most focused in helping you discover your most beautiful smile',
      image: '/images/about/work-2.jpg'
    },
    {
      title: 'Hack Growth',
      description: 'Overcame any hurdle or any other problem.',
      image: '/images/about/work-3.jpg'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#FAFAFA] py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h5 className="text-[#737373] text-base font-bold">ABOUT COMPANY</h5>
              <h1 className="text-[#252B42] text-4xl md:text-5xl font-bold">ABOUT US</h1>
              <p className="text-[#737373]">
                We know how large objects will act, but things on a small scale just do not act that way.
              </p>
              <button className="bg-[#23A6F0] text-white px-8 py-3 rounded-md hover:bg-[#2A7CC7] transition-colors">
                Get Quote Now
              </button>
            </div>
            <div className="relative">
              <img 
                src="/images/about/hero-image.jpg" 
                alt="About Us Hero"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h2 className="text-[#252B42] text-4xl font-bold mb-2">{stat.number}</h2>
                <p className="text-[#737373]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-[#FAFAFA] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#252B42] text-3xl md:text-4xl font-bold mb-4">We are providing best business service.</h2>
            <p className="text-[#737373]">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="/images/about/video-cover.jpg" 
              alt="Video Cover"
              className="w-full h-[500px] object-cover"
            />
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#23A6F0] p-6 rounded-full hover:bg-[#2A7CC7] transition-colors">
              <Play size={32} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#252B42] text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-[#737373]">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-[400px] object-cover rounded-lg mb-4"
                />
                <h3 className="text-[#252B42] text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-[#737373] mb-4">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Principles Section */}
      <section className="bg-[#FAFAFA] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#252B42] text-3xl md:text-4xl font-bold mb-4">Work Principles</h2>
            <p className="text-[#737373]">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workPrinciples.map((principle, index) => (
              <div key={index} className="text-center">
               
                <h3 className="text-[#252B42] text-xl font-bold mb-2">{principle.title}</h3>
                <p className="text-[#737373]">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src="/images/about/desktop-clients.jpg" 
              alt="Our Client Companies"
              className="w-full max-w-7xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-[#2A7CC7] text-white py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start your 14 days free trial</h2>
              <p className="mb-8">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.</p>
              <button className="bg-[#23A6F0] text-white px-8 py-3 rounded-md hover:bg-[#252B42] transition-colors flex items-center">
                Try it free now <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
            <div className="hidden md:block">
              <div className="max-w-md mx-auto">
                <img 
                  src="/images/about/cta-image.jpg" 
                  alt="Contact CTA"
                  className="w-full h-[500px] object-cover object-top rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 