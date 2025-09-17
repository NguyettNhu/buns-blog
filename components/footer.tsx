import Link from "next/link"
import { Mail, Github, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-purple-500/30 bg-gradient-to-r from-purple-900 via-indigo-900 to-black text-gray-200">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo / Blog Info */}
        <div>
          <h2 className="text-2xl font-bold text-white drop-shadow-md">🌌 Bun&apos;s Blog</h2>
          <p className="mt-3 text-sm text-purple-200/80">
            Chia sẻ kiến thức về lập trình, công nghệ và trải nghiệm học tập.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Điều hướng</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-purple-400 transition">Trang chủ</Link></li>
            <li><Link href="/blog" className="hover:text-purple-400 transition">Blog</Link></li>
            <li><Link href="/series" className="hover:text-purple-400 transition">Series</Link></li>
            <li><Link href="/tags" className="hover:text-purple-400 transition">Tags</Link></li>
            <li><Link href="/about" className="hover:text-purple-400 transition">Giới thiệu</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <a href="https://bunsportfolio.io.vn/?utm_source=zalo&utm_medium=zalo&utm_campaign=zalo" className="hover:text-purple-400 transition"> PersonalProject</a>
            </li>
            <li className="flex items-center gap-2">
              <Github className="h-4 w-4 text-purple-400" />
              <a href="https://github.com/NguyettNhu" target="_blank" className="hover:text-purple-400 transition">GitHub</a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-purple-400" />
              <a href="https://www.facebook.com/nhunguyttttne" target="_blank" className="hover:text-purple-400 transition">Facebook</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-purple-400" />
              <a href="https://www.instagram.com/_nguytdeyy_/" target="_blank" className="hover:text-purple-400 transition">Instagram</a>
            </li>
          </ul>
        </div>

        {/* Newsletter / Extra */}
        <div>
          <h3 className="text-lg font-semibold text-purple-300 mb-3">Cập nhật mới</h3>
          <p className="text-sm text-purple-200/80 mb-3">
            Đăng ký nhận thông báo về bài viết mới nhất.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 rounded-lg bg-black/40 border border-purple-500/40 px-3 py-2 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md shadow-purple-500/30 transition"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20 py-4 text-center text-sm text-purple-300">
        © {new Date().getFullYear()} Bun&apos;s Blog. All rights reserved. 💜
      </div>
    </footer>
  )
}
