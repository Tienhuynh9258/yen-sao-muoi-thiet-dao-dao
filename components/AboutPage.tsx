'use client'

import { ArrowLeft, Award, Users, Factory } from 'lucide-react'
import Link from 'next/link'

export function AboutPage() {
  return (
    <main style={{ backgroundColor: '#fdf8f3', color: '#1a0a00' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 style={{ fontFamily: 'var(--font-sans)', color: '#8b1a1a' }} className="text-5xl md:text-6xl font-bold mb-6">
            Giới Thiệu
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#4a3728' }} className="text-xl leading-relaxed max-w-3xl">
            Yến Sào Thiên Nhiên Mười Thiết – Đào Đào – giữ trọn tinh hoa tổ yến quê nhà Gò Công.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00' }} className="text-3xl font-bold mb-6">
              Câu Chuyện Khởi Nguồn Từ Tình Yêu Yến Sào
            </h2>
            <div style={{ fontFamily: 'var(--font-sans)', color: '#4a3728' }} className="space-y-4 text-lg leading-relaxed">
              <p>
                Câu chuyện của Yến sào thiên nhiên Mười Thiết bắt đầu từ một cái duyên rất tự nhiên vào khoảng năm 1988, khi những đàn chim yến bay về làm tổ trong chính ngôi nhà của gia đình tôi tại Gò Công. Từ khoảnh khắc giản dị đó, nghề nuôi và khai thác yến sào đã trở thành một phần gắn bó sâu sắc với gia đình suốt hơn 30 năm qua.
              </p>
              <p>
                Trải qua thời gian, nghề yến không chỉ là sinh kế mà còn là sự gìn giữ một giá trị truyền thống, được truyền lại qua nhiều thế hệ. Đây cũng là hành trình đã được ghi lại trong một phóng sự thực hiện tại Gò Công, phản ánh một phần chặng đường lao động bền bỉ và tâm huyết ấy.
              </p>
              <p>
                Với mong muốn phát triển và đưa sản phẩm đến gần hơn với nhiều khách hàng, các thành viên trong gia đình tiếp tục mở rộng và xây dựng thương hiệu. Từ đó, Yến Sào Mười Thiết – Đào Đào ra đời, mang theo định hướng nâng cao chất lượng, đa dạng sản phẩm và mở rộng thị trường nhưng vẫn giữ nguyên giá trị cốt lõi: yến sạch – yến thật – yến làm bằng tâm huyết.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl h-96 w-full">
              <div className="relative w-full h-full">
                <img
                  src="/banner.jpg"
                  alt="Yến sào thiên nhiên"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '600px' }}
                />
              </div>
            </div>
            <div
              style={{ backgroundColor: '#fef2dd', borderColor: '#c8922a' }}
              className="absolute -bottom-8 right-8 rounded-2xl p-4 md:p-8 shadow-lg border max-w-md"
            >
              <p
                style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00' }}
                className="text-base md:text-lg leading-relaxed"
              >
                "Từ tổ yến tự nhiên đến từng sản phẩm tinh tế – chúng tôi không chỉ bán yến sào, mà còn trao gửi một giá trị truyền thống."
              </p>
            </div>
          </div>
        </div>

        {/* Sun-Moon Concept */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-sans)', color: '#8b1a1a' }}>Triết Lý Kinh Doanh: SUN vs MOON</h2>
          <p
            className="text-lg leading-relaxed inline-block"
            style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00', backgroundColor: '#fef2dd', padding: '12px 24px', borderRadius: '8px', border: '1px solid #c8922a' }}
          >
            <span className="font-bold" style={{ color: '#c8922a' }}>The SUN Approach</span> (Hoạt động ban ngày):  <br/>
            Tập trung vào một mục tiêu, kết quả theo cách tự nhiên và bền vững.
          </p>
          <br /><br />
          <p
            className="text-lg leading-relaxed inline-block"
            style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00', backgroundColor: '#fff0f0', padding: '12px 24px', borderRadius: '8px', border: '1px solid #8b1a1a' }}
          >
            <span className="font-bold" style={{ color: '#8b1a1a' }}>The MOON Approach</span> (Hoạt động ban đêm):  <br/>
            Tập trung vào việc lướt qua sự quan trọng đổi lấy kết quả tức thì, tiềm ẩn nhiều rủi ro.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", color: "#4a3728" }} className="mt-6 text-lg leading-relaxed">
            Chúng tôi chọn <strong>"SUN Mode"</strong> — không cật lực hay lắc lư theo các trào lưu, mà làm việc kỹ lưỡng, có chiến lược
            và mang tầm nhìn dài hạn. Điều này thể hiện cách Yến Sào Mười Thiết Đào Đào vận hành — không vội vàng,
            nhưng vững chắc.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Award, title: 'Chất Lượng Hàng Đầu', desc: 'Sản phẩm yến sào cao cấp, được chọn lọc kỹ lưỡng và kiểm định nghiêm ngặt.' },
            { icon: Users, title: 'Tận Tâm Khách Hàng', desc: 'Đội ngũ tư vấn chuyên nghiệp, sẵn sàng hỗ trợ khách hàng 24/7 chu đáo, tận tình.' },
            { icon: Factory, title: 'Uy tín Thương Hiệu', desc: 'Người dùng đánh giá 5 sao — Thương hiệu yến sào được tin tưởng hàng đầu Việt Nam.' },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#ffffff', border: '1px solid #e8d5b0' }}>
              <feature.icon className="w-12 h-12 mx-auto mb-4" style={{ color: '#8b1a1a' }} />
              <h3 className="font-sans text-xl font-bold mb-2" style={{ color: '#1a0a00' }}>
                {feature.title}
              </h3>
              <p className="font-sans leading-relaxed" style={{ color: '#8a6a40' }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00' }} className="text-3xl font-bold mb-8">
            Giá Trị Cốt Lõi: Vàng, đỏ, xanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div style={{ backgroundColor: '#fefef7', borderColor: '#c8922a' }} className="p-6 rounded-xl border space-y-3">
              <h3 className="text-xl font-bold" style={{ color: '#c8922a ' }}>Vàng: Chất lượng tốt nhất cho sức khỏe</h3>
              <p style={{ color: '#4a3728' }}>Cam kết 100% yến sào nguyên chất, không chất bảo quản, an toàn và bổ dưỡng cho sức khỏe gia đình.</p>
            </div>
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#fff0f0', borderColor: '#8b1a1a' }}>
              <h3 className="text-xl font-bold" style={{ color: '#8b1a1a' }}>Đỏ: Tận tâm, trách nhiệm với khách hàng</h3>
              <p style={{ color: '#4a3728' }}>Mỗi sản phẩm gửi đi đều được đóng gói cẩn thận, tư vấn chu đáo phù hợp nhu cầu khách hàng.</p>
            </div>
            <div className="p-6 rounded-xl border" style={{ backgroundColor: '#f0f8ff', borderColor: '#4ecdc4' }}>
              <h3 className="text-xl font-bold" style={{ color: '#1a535c' }}>Xanh: Bảo vệ môi trường, phát triển bền vững</h3>
              <p style={{ color: '#4a3728' }}>Quy trình sạch, trách nhiệm thân thiện với môi trường cùng định hướng phát triển lâu dài.</p>
            </div>

            <div className="flex flex-col items-center justify-center" style={{ backgroundColor: '#fef2dd', borderColor: '#c8922a' }}>
              <h3 className="text-3xl font-bold mb-3" style={{ color: '#8b1a1a' }}>HÒA QUYỆN</h3>
              <p style={{ color: '#4a3728', fontFamily: 'var(--font-sans)' }} className="text-lg leading-relaxed max-w-md">
                Ba giá trị "Vàng-Đỏ-Xanh" hòa quyện tạo nên thương hiệu Yến Sào Mười Thiết Đào Đào — nơi chất lượng gặp gỡ tận tâm và bền vững.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="inline-flex items-center gap-2 font-semibold transition-colors hover:underline mb-12" style={{ color: '#c8922a' }}>
          <ArrowLeft className="w-5 h-5" />
          Trang Chủ
        </Link>

        {/* Thank You Section */}
        <div className="mb-16" style={{ backgroundColor: '#1a0a00', borderColor: '#c8922a' }}>
          <div className="p-7 max-w-4xl mx-auto text-center rounded-2xl">
            <h2 style={{ fontFamily: 'var(--font-sans)', color: '#c8922a' }} className="text-3xl font-bold mb-6">
              Lời Cảm Ơn 🌟
            </h2>
            <p
              style={{ fontFamily: 'var(--font-sans)', color: '#fdf3e3' }}
              className="text-lg leading-relaxed max-w-3xl mx-auto italic"
            >
              Yến Sào Sài Gòn xin gửi tới Quý khách hàng lời cảm ơn chân thành vì đã ủng hộ chúng tôi trong suốt thời gian qua.
              <br />
              Kính chúc quý khách và gia đình có một sức khỏe dồi, tận hưởng niềm vui an nhiên bên những người thân yêu!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
