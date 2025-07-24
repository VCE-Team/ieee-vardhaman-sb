import React from 'react';
import CountUp from '../../../components/reactcom/CountUp';

export function Stats({ members = 0, events = 0, awards = 0 }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex items-center justify-center">
              <CountUp
                from={0}
                to={members}
                direction="up"
                duration={2}
                className="text-7xl font-bold text-green-700"
              />
              <span className="text-7xl font-bold text-green-700">+</span>
            </div>
            <div className="mt-2 text-gray-600">Members</div>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <CountUp
                from={0}
                to={events}
                direction="up"
                duration={2}
                className="text-7xl font-bold text-green-700"
              />
              <span className="text-7xl font-bold text-green-700">+</span>
            </div>
            <div className="mt-2 text-gray-600">Events Conducted</div>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <CountUp
                from={0}
                to={awards}
                direction="up"
                duration={2}
                className="text-7xl font-bold text-green-700"
              />
              <span className="text-7xl font-bold text-green-700">+</span>
            </div>
            <div className="mt-2 text-gray-600">Awards Won</div>
          </div>
        </div>
      </div>
    </section>
  );
} 