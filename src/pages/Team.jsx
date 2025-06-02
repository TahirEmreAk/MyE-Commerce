import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Gökhan Özdemir',
      role: 'Project Manager',
      image: '/images/team/gokhanozdemir.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/gnozdemir/',
        twitter: '#',
        facebook: '#',
        instagram: '#'
      }
    },
    {
      name: 'Tahir Emre AK',
      role: 'Full Stack Developer',
      image: '/images/team/tahir.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/tahir-emre-ak-804ab0203/',
        twitter: '#',
        facebook: '#',
        instagram: '#'
      }
    },
    {
      name: 'Hasan Erdem AK',
      role: 'Full Stack Developer',
      image: '/images/team/erdem.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/hasan-erdem-ak/?originalSubdomain=tr',
        twitter: '#',
        facebook: '#',
        instagram: '#'
      }
    },
    // Diğer takım üyeleri buraya eklenecek
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#FAFAFA] py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-12">
            <h5 className="text-[#737373] text-base font-bold mb-2">WHAT WE DO</h5>
            <h1 className="text-[#252B42] text-4xl md:text-5xl font-bold mb-4">Innovation tailored for you</h1>
            <div className="flex items-center justify-center gap-2 text-[#737373] text-sm">
              <span>Home</span>
              <span>→</span>
              <span>Team</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/images/team/desktop-hero-picture-1.png" 
              alt="Fashion model"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-[#FFFFFF] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#252B42] text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-[#737373]">Problems trying to resolve the conflict between <br /> the two major realms of Classical physics: Newtonian mechanics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-[#FFFFFF] rounded-lg overflow-hidden text-center group">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#335BF5] p-2 rounded-full hover:bg-[#23A6F0] transition-colors">
                      <Facebook size={20} className="text-white" />
                    </a>
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-[#E51F5A] p-2 rounded-full hover:bg-[#23A6F0] transition-colors">
                      <Instagram size={20} className="text-white" />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-[#55ACEE] p-2 rounded-full hover:bg-[#23A6F0] transition-colors">
                      <Twitter size={20} className="text-white" />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-[#0A66C2] p-2 rounded-full hover:bg-[#23A6F0] transition-colors">
                      <Linkedin size={20} className="text-white" />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#252B42] text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-[#737373] mb-4">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#FAFAFA] py-16">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="text-center">
            <h2 className="text-[#252B42] text-3xl md:text-4xl font-bold mb-4">Start your 14 days free trial</h2>
            <p className="text-[#737373] mb-8">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.</p>
            <button className="bg-[#23A6F0] text-white px-8 py-3 rounded-md hover:bg-[#2A7CC7] transition-colors">
              Try it free now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team; 