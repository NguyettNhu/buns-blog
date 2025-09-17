import React from "react"

export default function NestjsVsDeploy() {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-3xl mx-auto py-8">
      <h1>Triển khai ứng dụng NestJS: Hướng dẫn từng bước</h1>
      <p>
        NestJS là một framework mạnh mẽ cho backend Node.js, giúp phát triển ứng dụng có cấu trúc rõ ràng và dễ mở rộng. Sau khi hoàn thành dự án, bước quan trọng tiếp theo là deploy để mọi người có thể truy cập. Dưới đây là một số cách phổ biến để đưa ứng dụng NestJS của bạn “lên sóng”:
      </p>
      <h2>1. Deploy lên Heroku</h2>
      <p>
        Heroku là lựa chọn thân thiện cho người mới bắt đầu.<br/>
        <b>Ưu điểm:</b> Miễn phí (plan cơ bản), cấu hình đơn giản.
      </p>
      <p><b>Cách làm:</b></p>
      <ul>
        <li>Tạo repo Git cho dự án NestJS.</li>
        <li>Cài Heroku CLI và đăng nhập.</li>
        <li>Chạy lệnh <code>heroku create</code> để tạo app.</li>
        <li>Push code lên Heroku bằng <code>git push heroku main</code>.</li>
      </ul>
      <p>
        <b>Kinh nghiệm:</b> Luôn khai báo cổng trong <code>main.ts</code> bằng <code>process.env.PORT</code> để tránh lỗi khi Heroku cấp port ngẫu nhiên.
      </p>
      <h2>2. Deploy với VPS (DigitalOcean, Linode, Vultr)</h2>
      <p>
        Với VPS, bạn có toàn quyền kiểm soát server.<br/>
        <b>Ưu điểm:</b> Toàn quyền quản lý, thích hợp cho dự án cần custom.
      </p>
      <p><b>Cách làm:</b></p>
      <ul>
        <li>Thuê một VPS (Ubuntu thường được dùng nhiều).</li>
        <li>Cài đặt Node.js và PM2 để chạy ứng dụng NestJS.</li>
        <li>Dùng Nginx để reverse proxy, giúp trỏ domain về app.</li>
        <li>Cấu hình firewall và HTTPS bằng Let’s Encrypt.</li>
      </ul>
      <p>
        <b>Kinh nghiệm:</b> Nên dùng PM2 để đảm bảo app tự động restart khi server gặp sự cố.
      </p>
      <h2>3. Deploy lên Docker + Cloud Provider</h2>
      <p>
        Docker hóa ứng dụng giúp dễ triển khai ở nhiều môi trường.<br/>
        <b>Ưu điểm:</b> Triển khai nhanh, đảm bảo tính nhất quán.
      </p>
      <p><b>Cách làm:</b></p>
      <ul>
        <li>Viết Dockerfile cho ứng dụng NestJS.</li>
        <li>Build image: <code>docker build -t my-nest-app .</code></li>
        <li>Push image lên Docker Hub.</li>
        <li>Deploy image này trên AWS ECS, Azure Container Instances hoặc Google Cloud Run.</li>
      </ul>
      <p>
        <b>Kinh nghiệm:</b> Đây là lựa chọn tốt khi muốn scale nhiều container.
      </p>
      <h2>4. Deploy trên Render / Railway</h2>
      <p>
        Render và Railway là các dịch vụ cloud mới, tương tự Heroku nhưng dễ dùng hơn.<br/>
        <b>Ưu điểm:</b> Free tier hào phóng, tích hợp CI/CD tự động từ GitHub.
      </p>
      <p><b>Cách làm:</b></p>
      <ul>
        <li>Tạo project trên Render hoặc Railway.</li>
        <li>Kết nối GitHub repo NestJS.</li>
        <li>Chỉ định command chạy build (<code>npm run build</code>) và start (<code>npm run start:prod</code>).</li>
        <li>Deploy chỉ với vài cú click.</li>
      </ul>
      <p>
        <b>Kinh nghiệm:</b> Dễ cho người mới, không cần nhiều cấu hình phức tạp.
      </p>
      <h2>5. Deploy bằng AWS / Azure / GCP</h2>
      <p>
        Nếu dự án của bạn hướng đến quy mô lớn, các dịch vụ cloud này là lựa chọn tối ưu.<br/>
        AWS Elastic Beanstalk, Azure App Service, Google App Engine đều hỗ trợ Node.js trực tiếp.<br/>
        <b>Ưu điểm:</b> Ổn định, khả năng mở rộng mạnh mẽ.<br/>
        <b>Nhược điểm:</b> Chi phí cao hơn, cấu hình phức tạp.
      </p>
      <h2>🔑 Kết luận</h2>
      <p>
        Tùy vào mục đích dự án và ngân sách, bạn có thể chọn:<br/>
        <b>Heroku / Render / Railway</b> → phù hợp cho học tập và demo.<br/>
        <b>VPS / Docker</b> → phù hợp cho dự án thực tế nhỏ, cần custom.<br/>
        <b>AWS / Azure / GCP</b> → phù hợp cho dự án lớn, sản phẩm thương mại.<br/>
        <br/>
        Dù chọn cách nào, điều quan trọng là bạn phải chuẩn bị ứng dụng NestJS tối ưu, có thể chạy tốt ở môi trường production.
      </p>
    </article>
  )
}
