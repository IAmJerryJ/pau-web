import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="relative py-6 text-white"
      style={{
        backgroundImage: "url('/FooterBackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gray-900/80" />{" "}
      {/* 背景图片上的暗色遮罩 */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Logo 图片 */}
        <div className="flex justify-start my-12">
          <Image
            src="/PegaLogo.png"
            alt="Pega Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 第一列：地址 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p className="text-gray-200">
              Unit 4/5 Talavera Rd, <br />
              Macquarie Park NSW 2113
            </p>
          </div>

          {/* 第二列：导航 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-200 hover:text-white transition"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-200 hover:text-white transition"
              >
                Services
              </Link>
              <Link
                href="/team"
                className="text-gray-200 hover:text-white transition"
              >
                Team
              </Link>
              <Link
                href="/contacts"
                className="text-gray-200 hover:text-white transition"
              >
                Contacts
              </Link>
            </nav>
          </div>

          {/* 第三列：社交媒体 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Social</h3>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-200 hover:text-white transition"
            >
              <Linkedin className="w-6 h-6 mr-2" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-4 pb-4 border-t border-gray-500 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Pegatron Australia. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
