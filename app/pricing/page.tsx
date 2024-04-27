import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    name: "Standard",
    image: "/images/standard.jpg",
    price: "Rp 1.000.000/day",
    discount: "Get discount 10% over 3 days",
    description:
      "Kamar Standard menawarkan kenyamanan sederhana dengan harga terjangkau. Dengan tempat tidur yang nyaman, area kerja, dan kamar mandi pribadi, kamar ini adalah pilihan ideal bagi wisatawan yang mencari akomodasi yang bersahabat dengan anggaran.",
  },
  {
    name: "Deluxe",
    image: "/images/deluxe.jpg",
    price: "Rp 2.000.000/day",
    discount: "Get discount 10% over 3 days",
    description:
      "Kamar Deluxe menyajikan kemewahan dalam kesederhanaan, dengan desain yang elegan dan fasilitas modern seperti TV layar datar, akses Wi-Fi gratis, dan kamar mandi pribadi dengan perlengkapan mandi berkualitas. Pengalaman menginap yang istimewa untuk tamu yang menghargai kenyamanan.",
  },
  {
    name: "Family",
    image: "/images/family.jpg",
    price: "Rp 3.000.000/day",
    discount: "Get discount 10% over 3 days",
    description:
      "Kamar Family adalah ruang luas yang ramah keluarga, dirancang khusus untuk memenuhi kebutuhan perjalanan bersama keluarga. Dilengkapi dengan fasilitas tambahan seperti tempat tidur tambahan atau sofa bed, kamar mandi pribadi, dan area duduk, kamar ini menawarkan pengalaman menginap yang menyenangkan bagi seluruh keluarga.",
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="
        text-4xl 
        text-center
         md:text-6xl 
         font-bold 
         bg-gradient-to-r
        from-black
         to-gray-500 
         bg-clip-text
         text-transparent md:pb-10
        "
      >
        Pricing
        <div className="text-2xl text-center md:text-4xl font-bold md:py-10">
          Simple and transparent pricing plans for all rooms.
        </div>
      </div>

      <div className="md:flex gap-16">
        {features.map((feature, index) => (
          <Card key={index} className="w-[500px] max-w-xl">
            <CardHeader>
              <CardTitle className="text-2xl">{feature.name}</CardTitle>
              <CardDescription>{feature.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={feature.image}
                alt={feature.name}
                width={500}
                height={500}
              />
              <div className="py-4">{feature.discount}</div>
              <CardDescription className="text-xl text-justify">
                {feature.description}
              </CardDescription>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
