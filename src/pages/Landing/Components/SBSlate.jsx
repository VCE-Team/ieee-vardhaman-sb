import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const SBSlate = () => {
    const teamMembers = [
        {
            id: 10,
            name: "Dr JVR Ravindra",
            position: "Advisor",
            image: "https://vardhaman.org/wp-content/uploads/2025/02/jvr_sir-1-200x200.jpg",
            email: "",
            linkedin: "",
            description: "Providing guidance and mentorship to student leaders and initiatives."
        },
        {
            id: 0,
            name: "Dr. Sangeeta Singh",
            position: "Deputy Advisor",
            image: "https://res.cloudinary.com/dmdiia2yv/image/upload/v1753678123/Sangeeta_Singh_APSCON_m632ac.png",
            email: "",
            linkedin: "",
            description: "Providing guidance and mentorship to student leaders and initiatives."
        },
        {
            id: 1,
            name: "M. Uday Kiran",
            position: "Chair",
            image: "https://res.cloudinary.com/doyh3fqr5/image/upload/v1742148104/090092b7-19ff-43de-b38c-4d17133ac4b7.png",
            email: "makineni.uday@ieee.org",
            linkedin: "https://www.linkedin.com/in/uday-kiran-makineni/",
            description: "Leading IEEE initiatives and fostering innovation in our community."
        },
        {
            id: 2,
            name: "Thanmai",
            position: "Vice Chair",
            image: "https://res.cloudinary.com/dmdiia2yv/image/upload/v1753345965/thanmai2_g5za1q.jpg",
            email: "vicechair@ieee-vardhaman.org",
            linkedin: "https://linkedin.com/in/sarahjohnson",
            description: "Supporting leadership and driving technical excellence across all programs."
        },
        {
            id: 3,
            name: "Rohith",
            position: "Secratary",
            image: "https://res.cloudinary.com/dmdiia2yv/image/upload/v1753852666/Chair.pes_wmbfzs.jpg",
            email: "vicechair@ieee-vardhaman.org",
            linkedin: "https://linkedin.com/in/sarahjohnson",
            description: "Supporting leadership and driving technical excellence across all programs."
        },
        {
            id: 4,
            name: "Aditya",
            position: "Treasurer",
            image: "",
            email: "treasurer@ieee-vardhaman.org",
            linkedin: "https://linkedin.com/in/michaelchen",
            description: "Managing financial resources and ensuring sustainable growth."
        },
        {
            id: 5,
            name: "Anil",
            position: "Webmaster",
            image: "",
            email: "technicalhead@ieee-vardhaman.org",
            linkedin: "https://linkedin.com/in/michaelchen",
            description: "Managing technical resources and ensuring sustainable growth."
        },
        {
            id: 6,
            name: "Yasaswini",
            position: "Webmaster",
            image: "",
            email: "technicalhead@ieee-vardhaman.org",
            linkedin: "https://linkedin.com/in/michaelchen",
            description: "Managing technical resources and ensuring sustainable growth."
        },

    ];

    const getPositionColor = (position) => {
        switch (position.toLowerCase()) {
            case 'chair':
                return 'bg-gradient-to-r from-blue-600 to-blue-800';
            case 'vice chair':
                return 'bg-gradient-to-r from-green-600 to-green-800';
            case 'treasurer':
                return 'bg-gradient-to-r from-purple-600 to-purple-800';
            case 'advisor':
                return 'bg-gradient-to-r from-orange-600 to-orange-800';
            default:
                return 'bg-gradient-to-r from-gray-600 to-gray-800';
        }
    };

    const getBorderColor = (position) => {
        switch (position.toLowerCase()) {
            case 'chair':
                return 'hover:border-blue-600';
            case 'vice chair':
                return 'hover:border-green-600';
            case 'treasurer':
                return 'hover:border-purple-600';
            case 'advisor':
                return 'hover:border-orange-600';
            default:
                return 'hover:border-gray-600';
        }
    };

    const TeamCard = ({ member }) => (
        <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-200 ${getBorderColor(member.position)} flex flex-col`}>
            <div className={`absolute inset-0 ${getPositionColor(member.position)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

            <div className="relative overflow-hidden h-64">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
            </div>

            <div className="p-6 relative flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                    <div className={`w-max px-2 py-1 rounded-full text-white text-sm font-semibold ${getPositionColor(member.position)}`}>
                        {member.position}
                    </div>
                    <div className="flex space-x-2">
                        <a
                            href={`mailto:${member.email}`}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                            aria-label={`Email ${member.name}`}
                        >
                            <Mail className="w-3.5 h-3.5" />
                        </a>
                        <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-300 group-hover:scale-110"
                            aria-label={`LinkedIn profile of ${member.name}`}
                        >
                            <Linkedin className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 text-center">
                    {member.name}
                </h3>
            </div>
        </div>
    );

    return (
        <section id="sb-slate" className="mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Meet Our <span className="text-blue-600">Student Branch Slate</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our dedicated team of student leaders working together to advance technology
                        and foster innovation within the IEEE community at Vardhaman College.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member) => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SBSlate;
