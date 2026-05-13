import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLang } from "@/lib/lang";

const reviews = [
  {
    name: { en: "Ahmed Khan", ur: "احمد خان" },
    role: { en: "Father of 2 from London", ur: "لندن سے دو بچوں کے والد" },
    text: {
      en: "Alhamdulillah, my children have learned proper Tajweed in just a few months. The teachers are patient, knowledgeable, and truly care about each student.",
      ur: "الحمدللہ، میرے بچوں نے صرف چند مہینوں میں صحیح تجوید سیکھ لی۔ اساتذہ صابر، علم رکھنے والے اور ہر طالب علم کا واقعی خیال رکھتے ہیں۔",
    },
  },
  {
    name: { en: "Fatima Siddiqui", ur: "فاطمہ صدیقی" },
    role: { en: "Mother from Birmingham", ur: "برمنگھم سے ایک ماں" },
    text: {
      en: "MashaAllah, the best online Quran academy. My daughter loves her classes and recites the Quran beautifully now. May Allah reward the entire team.",
      ur: "ماشاءاللہ، بہترین آن لائن قرآن اکیڈمی۔ میری بیٹی اپنی کلاسز سے محبت کرتی ہے اور اب خوبصورتی سے قرآن پڑھتی ہے۔ اللہ پوری ٹیم کو جزائے خیر دے۔",
    },
  },
  {
    name: { en: "Yusuf Rahman", ur: "یوسف رحمٰن" },
    role: { en: "Father from Manchester", ur: "مانچسٹر سے والد" },
    text: {
      en: "The flexibility of timing and the dedication of the teachers is unmatched. My son completed Nazra and is now memorizing Quran. JazakAllah Khair!",
      ur: "وقت کی لچک اور اساتذہ کی محنت بے مثال ہے۔ میرے بیٹے نے ناظرہ مکمل کر لیا اور اب قرآن حفظ کر رہا ہے۔ جزاک اللہ خیر!",
    },
  },
  {
    name: { en: "Aisha Malik", ur: "عائشہ ملک" },
    role: { en: "Mother from Leeds", ur: "لیڈز سے ایک ماں" },
    text: {
      en: "I was looking for a trusted Quran academy for my kids and Allah blessed us with this one. The Tajweed lessons are clear and easy to follow.",
      ur: "میں اپنے بچوں کے لیے ایک قابل اعتماد قرآن اکیڈمی تلاش کر رہی تھی اور اللہ نے ہمیں یہ نصیب کی۔ تجوید کے اسباق واضح اور آسان ہیں۔",
    },
  },
  {
    name: { en: "Bilal Ahmad", ur: "بلال احمد" },
    role: { en: "Father from Glasgow", ur: "گلاسگو سے والد" },
    text: {
      en: "Highly recommended for every Muslim family living abroad. The teachers connect with kids beautifully and the prices are very reasonable.",
      ur: "بیرون ملک رہنے والے ہر مسلم خاندان کے لیے انتہائی تجویز کردہ۔ اساتذہ بچوں سے خوبصورتی سے جڑتے ہیں اور قیمتیں بہت مناسب ہیں۔",
    },
  },
];

const Testimonials = () => {
  const { t } = useLang();
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("What Muslim Parents Say", "مسلم والدین کیا کہتے ہیں")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Real reviews from parents whose children learn Quran with us.",
              "حقیقی والدین کے جائزے جن کے بچے ہم سے قرآن سیکھتے ہیں۔",
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-primary/40" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed italic">
                  "{t(r.text.en, r.text.ur)}"
                </p>
                <div className="pt-3 border-t">
                  <p className="font-semibold">{t(r.name.en, r.name.ur)}</p>
                  <p className="text-sm text-muted-foreground">{t(r.role.en, r.role.ur)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
