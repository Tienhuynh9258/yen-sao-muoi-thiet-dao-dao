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

          {/* Stats */}
          <div className="space-y-6">
            {[
              { icon: Factory, title: 'Nhà Máy Hiện Đại', desc: 'Công nghệ sản xuất tiên tiến' },
              { icon: Users, title: 'Nhân Viên Chuyên Nghiệp', desc: 'Tay nghề cao, giàu kinh nghiệm' },
              { icon: Award, title: 'Sản Phẩm Chất Lượng', desc: 'Chứng nhận quốc tế' },
            ].map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: '#ffffff', borderLeft: '4px solid #c8922a' }}
                className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <item.icon className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#c8922a' }} />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-sans)' }} className="font-bold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-sans)', color: '#8a6a40' }} className="text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div style={{ backgroundColor: '#ffffff' ,  borderColor: '#e8d5b0' }} className="rounded-lg p-12 border" >
          <h2 style={{ fontFamily: 'var(--font-sans)', color: '#1a0a00' }} className="text-3xl font-bold mb-8 text-center">
            Chứng Nhận Giải Thưởng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Chứng nhận Hàng Việt Nam Chất lượng cao 2016',
              'Đạt Tiêu chuẩn Vệ sinh An toàn thực phẩm của Bộ Y tế',
              'Phù hợp tiêu chuẩn hàng Việt Nam Chất lượng',
              'Cúp vàng Sản phẩm tiêu biểu 1000 năm Thăng Long Hà Nội',
              'Công ty uy tín hàng đầu Việt Nam',
              'Thương hiệu được tin tưởng nhất trong ngành',
            ].map((cert, index) => (
              <div
                key={index}
                style={{ backgroundColor: '#fdf3e3' }}
                className="p-4 rounded-lg text-center"
              >
                <p style={{ fontFamily: 'var(--font-sans)', color: '#4a3728' }} className="text-sm font-semibold">
                  {cert}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Section */}
        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold transition-colors hover:underline mb-6" style={{ color: '#c8922a' }}>
            <ArrowLeft className="w-5 h-5" />
            Trang Chủ
          </Link>
          <p
            style={{ fontFamily: 'var(--font-sans)', color: '#4a3728' }}
            className="text-lg leading-relaxed max-w-3xl mx-auto italic"
          >
            Yến Sào Mười Thiết Đào Đào xin gửi tới Quý khách hàng lời cảm ơn chân thành vì đã ủng hộ chúng tôi trong suốt thời gian qua.
            <br />
            Kính chúc quý khách và gia đình có một sức khỏe dồi, tận hưởng niềm vui an nhiên bên những người thân yêu!
          </p>
        </div>
      </div>
    </main>
  )
}
