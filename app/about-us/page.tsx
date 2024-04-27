import { getCustomersPerMonth } from "@/lib/actions";
import Image from "next/image";
import aboutImage from "@/public/images/Hotelku.jpg";

export default async function AboutUs() {
  return (
    <section className=" p-10 flex">
      <div className="flex flex-col justify-center pr-16 w-1/2">
        <div className="text-5xl flex font-bold pb-10 text-gradient bg-gradient-to-r from-blue-500 to-green-300 bg-clip-text text-transparent">
          About Ulya Hotel Solusi
        </div>
        <div className="text-justify text-lg md:text-xl md-10 bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent font-bold">
          Selamat datang di Hotel Ulya Solusi, tempat di mana kenyamanan bertemu
          dengan keanggunan. Sejak pendiriannya pada tahun 1995, Hotel Ulya
          Solusi telah menjadi destinasi unggulan bagi pelancong yang mencari
          pengalaman menginap yang istimewa di jantung kota. Kami di Hotel Ulya
          Solusi berkomitmen untuk memberikan layanan yang luar biasa kepada
          setiap tamu kami. Dari saat Anda melangkah masuk, Anda akan disambut
          oleh keramahan tim kami yang berdedikasi, yang siap membantu Anda
          membuat pengalaman menginap Anda menjadi tak terlupakan. Hubungi kami
          pada kontak dibawah ini:
          <table className="mt-4">
            <tbody>
              <tr>
                <td style={{ width: "150px" }}>Email</td>
                <td className="pl-4">ulyaleogroup@gmail.com</td>
              </tr>
              <tr>
                <td style={{ width: "150px" }}>No.Telp</td>
                <td className="pl-4">+6283874809638</td>
              </tr>
              <tr>
                <td style={{ width: "150px" }}>Alamat</td>
                <td className="pl-4">
                  Jl. Overste Isdiman No.33, Glempang, Bancarkembar, Kec.
                  Purwokerto Utara, Kabupaten Banyumas, Jawa Tengah 53114
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/2">
        <Image
          src={aboutImage}
          width={1700}
          height={1700}
          alt="about-image.jpeg"
          className="rounded-xl"
        />
      </div>
    </section>
  );
}
