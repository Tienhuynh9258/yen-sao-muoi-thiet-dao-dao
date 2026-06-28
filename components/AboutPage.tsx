'use client'

import { ArrowLeft, Award, Users, Factory } from 'lucide-react'
import { useAppContext } from '@/app/context'

export function AboutPage() {
  const { setCurrentPage } = useAppContext()

  return (
    <main style={{ backgroundColor: '#fdf8f3', color: '#1a0a00' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 transition-colors mb-8"
          style={{ color: '#c8922a' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Quay lại Trang chủ</span>
        </button>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 style={{ fontFamily: "'Merriweather', serif", color: '#8b1a1a' }} className="text-5xl md:text-6xl font-bold mb-6">
            Giới Thiệu
          </h1>
          <p style={{ fontFamily: "'Noto Sans', sans-serif" }} className="text-xl leading-relaxed max-w-3xl" style={{ color: '#4a3728' }}>
            Gần 30 cửa hàng Yến Sào Sài Gòn trên toàn quốc, hơn 20 sản phẩm từ tổ yến chất lượng cao được cung cấp cho hàng triệu khách hàng tin tưởng.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Text Content */}
          <div>
            <h2 style={{ fontFamily: "'Merriweather', serif" }} className="text-3xl font-bold mb-6" style={{ color: '#1a0a00' }}>
              Nhà Máy Sản Xuất Hiện Đại – Nhân Viên Giàu Kinh Nghiệm
            </h2>
            <div style={{ fontFamily: "'Noto Sans', sans-serif" }} className="space-y-4 text-lg leading-relaxed" style={{ color: '#4a3728' }}>
              <p>
                Với đội ngũ nhân viên tâm huyết, tay nghề cao, giàu kinh nghiệm làm sạch và chế biến tổ yến, cùng với nhà máy chế biến sở hữu thiết bị máy móc công nghệ sản xuất hiện đại, Yến Sào Sài Gòn không ngừng nỗ lực để mang đến cho quý khách hàng những sản phẩm tổ yến tốt nhất với mong muốn nâng cao chất lượng cuộc sống và sức khỏe cho người sử dụng.
              </p>
              <p>
                Hãy đến với Yến Sào Sài Gòn để trải nghiệm chất lượng và đẳng cấp của tổ yến nguyên chất. Chúng tôi cam kết đem lại sự hài lòng tuyệt đối cho khách hàng, là địa chỉ mua yến sào tin cậy số 1 Việt Nam.
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
                    <h3 style={{ fontFamily: "'Merriweather', serif" }} className="font-bold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Noto Sans', sans-serif", color: '#8a6a40' }} className="text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div style={{ backgroundColor: '#ffffff' }} className="rounded-lg p-12 border" style={{ borderColor: '#e8d5b0' }}>
          <h2 style={{ fontFamily: "'Merriweather', serif" }} className="text-3xl font-bold mb-8 text-center" style={{ color: '#1a0a00' }}>
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
                <p style={{ fontFamily: "'Noto Sans', sans-serif", color: '#4a3728' }} className="text-sm font-semibold">
                  {cert}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Section */}
        <div className="mt-16 text-center">
          <p
            style={{ fontFamily: "'Noto Sans', sans-serif", color: '#4a3728' }}
            className="text-lg leading-relaxed max-w-3xl mx-auto italic"
          >
            Yến Sào Sài Gòn xin gửi tới Quý khách hàng lời cảm ơn chân thành vì đã ủng hộ chúng tôi trong suốt thời gian qua. 
            <br />
            Kính chúc quý khách và gia đình có một sức khỏe dồi, tận hưởng niềm vui an nhiên bên những người thân yêu!
          </p>
        </div>
      </div>
    </main>
  )
}
