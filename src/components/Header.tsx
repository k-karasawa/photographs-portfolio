import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { PrimaryButton } from './PrimaryButton';
import { useState } from 'react';

export const Header = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  let lastScrollY = 0;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    
    if (latest > 100) {
      if (direction === "down" && !hidden) setHidden(true);
      if (direction === "up" && hidden) setHidden(false);
    } else {
      setHidden(false);
    }
    
    lastScrollY = latest;
  });

  const variants = {
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2,
          ease: "easeInOut"
        }
      }
    },
    hidden: { 
      y: "-100%",
      opacity: 0,
      transition: {
        y: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.header
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      initial="visible"
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="absolute inset-0 bg-white/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#333333]">咲矢弓道具</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/gallery" className="text-lg text-[#666666] hover:text-[#333333] transition-colors duration-200">
              ギャラリー
            </Link>
            <Link href="/ranking" className="text-lg text-[#666666] hover:text-[#333333] transition-colors duration-200">
              人気ランキング
            </Link>
            <PrimaryButton 
              href="/customize"
              icon={<HiOutlineChevronRight className="w-5 h-5" />}
              className="ml-4"
            >
              オーダーメイド　
            </PrimaryButton>
          </nav>

          <button className="md:hidden p-2">
            <span className="sr-only">メニューを開く</span>
            <div className="w-6 h-0.5 bg-[#333333] mb-1.5" />
            <div className="w-6 h-0.5 bg-[#333333] mb-1.5" />
            <div className="w-6 h-0.5 bg-[#333333]" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};
