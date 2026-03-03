"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Molnár Nándor",
    company: "Magán Vállakozó / Egyetemista",
    role: "Üzleti Partner",
    image: "https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-1/476364540_1354379462231065_5908644809902105656_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=9ywtOrsnyNoQ7kNvwE300tc&_nc_oc=AdlBRZaLIXphqRULqjDmaLG2L1IPgH9MW6Pr8qQuexlfmfoBXibrup2yBHTOmWvxzdE&_nc_zt=24&_nc_ht=scontent-vie1-1.xx&_nc_gid=FuQ-5D72a4TsOiKoI0ZpBQ&oh=00_AfvgGWtXgdz5Hysfb-HfG5f0Cwy3q-FQvU20grFjFIwwIg&oe=69A2A272",
    quote: "Sokat dolgoztam Szabolcsal együtt, mindig a legjobb munkájára törekedett. Őszintén nagyon jó kommunikációs készsége van. A közös projektjeink során mindig pontosan értette, hogy mit szeretnék, és a végeredmény mindig lenyűgöző volt. Nagyon ajánlom Szabolcsot bárkinek, aki egy megbízható és tehetséges fejlesztőt keres!",
    rating: 5
  }
  
];

const stats = [
  { value: "3+", label: "Befejezett Projekt" },
  { value: "3", label: "Elégedett Ügyfél" },
  { value: "-", label: "Pályakezdő vagyok " },
  { value: "100%", label: "Együttműködés" }
];

export default function Testimonials() {
  return (
    <section className="section relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2.5 bg-blue-900/30 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            Vélemények
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Amit Az Ügyfelek Mondanak
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Néhány visszajelzés azoktól, akikkel dolgoztam együtt.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0d0d0d] rounded-2xl p-8 border border-white/5 hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all duration-300"
          >
            <span>Legyél Te A Következő</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
