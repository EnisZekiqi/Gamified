import { motion } from "motion/react";


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const Features = () => {
    return ( 
        <>
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="h-full flex flex-col gap-10 px-7 sm:px-14">
            <motion.div
            variants={itemVariants}
            className="flex flex-col items-start gap-4 text-start">
                <span className="text-sm uppercase font-medium text-[#2563eb]">What we offer</span>
            <h1 className="text-[25px] sm:text-3xl text-[#1d1d1d] font-semibold">Elevate your productivity to the next level</h1>
            </motion.div>
            <motion.div
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-start gap-8 lg:gap-4 justify-between mt-10">
                <div className="flex flex-col items-start gap-2">
                   <div className="flex items-center gap-2">
                     <img src="https://framerusercontent.com/images/8XloMG9slaAAviwFXnArBqT18Y.svg" alt="" />
                    <h2 className="text-xl sm:text-2xl font-medium text-[#1d1d1d]">Productivity</h2>
                   </div>
                    <p className="text-sm sm:text-md font-light text-[#4b4b4b] max-w-sm text-start">Boost your efficiency with tools designed to streamline your workflow and enhance focus.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                        <img src="https://framerusercontent.com/images/fP8VSisvho3qaGtdE1UDgWG1N3g.svg" alt="" />
                    <h2 className="text-xl sm:text-2xl font-medium text-[#1d1d1d]">Creativity</h2>
                    </div>
                    <p className="text-sm sm:text-md font-light text-[#4b4b4b] max-w-sm text-start">Unleash your creative potential with innovative features that inspire and empower your ideas.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                   <div className="flex items-center gap-2">
                     <img src="https://framerusercontent.com/images/oI6jpPOLQDHv6FbcH28j1VQ8.svg" alt="" />
                    <h2 className="text-xl sm:text-2xl font-medium text-[#1d1d1d]">Collaboration</h2>
                   </div>
                    <p className="text-sm sm:text-md font-light text-[#4b4b4b] max-w-sm text-start">Enhance teamwork with seamless communication and project management tools.</p>
                </div>
            </motion.div>
        </motion.div>
        </>
     );
}
 
export default Features;