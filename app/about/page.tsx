export const metadata = {
  title: 'Giới thiệu - Bun\'s Blog',
  description: 'Thông tin về Bun\'s Blog, sứ mệnh, giá trị và liên hệ.'
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6 text-primary drop-shadow-lg">Giới thiệu về Bun&apos;s Blog</h1>
      <p className="mb-4 text-lg text-muted-foreground">
        Bun&apos;s Blog là nơi chia sẻ kiến thức, kinh nghiệm và cảm hứng về lập trình, công nghệ, cũng như hành trình học tập và phát triển bản thân trong lĩnh vực IT.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Sứ mệnh</h2>
      <p className="mb-4">
        Mang đến nguồn tài liệu chất lượng, dễ hiểu, cập nhật xu hướng mới giúp mọi người học lập trình hiệu quả hơn, từ cơ bản đến nâng cao.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Giá trị cốt lõi</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Chia sẻ thực tế, dễ áp dụng</li>
        <li>Khuyến khích học tập chủ động, sáng tạo</li>
        <li>Kết nối cộng đồng lập trình viên trẻ</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Liên hệ</h2>
      <p className="mb-2">Email: <a href="mailto:contact@bunsblog.dev" className="text-accent underline">contact@bunsblog.dev</a></p>
      <p>Facebook: <a href="https://facebook.com/yourfb" target="_blank" className="text-accent underline">facebook.com/yourfb</a></p>
    </div>
  )
}
