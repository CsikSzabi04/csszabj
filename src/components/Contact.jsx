import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center bg-cover bg-center border-b-8 border-blue-500">
      <motion.section
        id="contact"
        className="py-16 px-8 bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-3 mb-4 rounded-md text-black"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 mb-4 rounded-md text-black"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <textarea
            placeholder="Your Message"
            {...register("message", { required: "Message is required" })}
            className="w-full p-3 mb-4 rounded-md text-black"
          />
          {errors.message && <span className="text-red-500">{errors.message.message}</span>}

          <button type="submit" className="w-full py-3 bg-teal-500 text-white rounded-md mt-4">
            Send Message
          </button>
        </form>
      </motion.section>
    </section>
  );
}
