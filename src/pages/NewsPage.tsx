import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, Users, Megaphone, Newspaper, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import newsLaguna from "@/assets/news-laguna.jpg";
import newsLagunaCard from "@/assets/news-laguna-card.jpg";
import newsMostarCard from "@/assets/news-mostar-card.jpg";
import newsMostarAction from "@/assets/news-mostar-action.png";
import tomislavCard from "@/assets/tomislav/tomislav-7.png";
import tomislavDetail from "@/assets/tomislav/tomislav-detail.jpg";
import newsWeltplastCard from "@/assets/news-weltplast-card.jpg";
import najavaTomislav from "@/assets/news-najava-tomislav.jpg";
import najavaKupSiroki from "@/assets/news-najava-kup-siroki.jpg";
import najavaLjubuskiGameday from "@/assets/news-najava-ljubuski-gameday.jpg";
import cardNajavaLjubuskiGameday from "@/assets/card-najava-ljubuski-gameday.png";
import najavaLjubuski from "@/assets/news-najava-ljubuski.jpg";
import najavaMostar from "@/assets/news-najava-mostar.jpg";
import sponzorKtmBrina from "@/assets/news-sponzor-ktm-brina.jpg";
import junioriSarajevo from "@/assets/news-juniori-sarajevo.jpg";
import sponzorVokel from "@/assets/news-sponzor-vokel.jpg";
import sponzorMrvelji from "@/assets/news-sponzor-mrvelji.jpg";
import cardNajavaMostar from "@/assets/card-najava-mostar.png";
import cardNajavaTomislav from "@/assets/card-najava-tomislav.png";
import cardNajavaKupSiroki from "@/assets/card-najava-kup-siroki.png";
import cardJunioriSarajevo from "@/assets/card-juniori-sarajevo.png";
import cardNajavaLjubuski from "@/assets/card-najava-ljubuski.png";
import newsPorazLjubuski from "@/assets/news-poraz-ljubuski.png";
import newsPorazLjubuskiCard from "@/assets/news-poraz-ljubuski-card.jpg";
import xmas1 from "@/assets/xmas/xmas-1.jpg";
import xmas2 from "@/assets/xmas/xmas-2.jpg";
import xmas3 from "@/assets/xmas/xmas-3.jpg";
import xmas4 from "@/assets/xmas/xmas-4.jpg";
import xmas5 from "@/assets/xmas/xmas-5.jpg";
import xmas6 from "@/assets/xmas/xmas-6.jpg";
import xmas7 from "@/assets/xmas/xmas-7.jpg";
import xmas8 from "@/assets/xmas/xmas-8.jpg";
import xmasCard from "@/assets/xmas/xmas-card.png";
import xmasHero from "@/assets/xmas/xmas-hero.png";
import sponzorMiviko from "@/assets/news-sponzor-miviko.jpg";
import sponzorPlanet from "@/assets/news-sponzor-planet.jpg";
import najavasirokiAway from "@/assets/news-najava-siroki-away.jpg";
import porazSirokiAway from "@/assets/news-poraz-siroki-away.jpg";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: "utakmica" | "najava" | "klub";
  image: string;
  cardImage?: string;
  cardImagePosition?: string;
  galleryImages?: string[];
}

const allNews: NewsItem[] = [
  { id: 36, title: "Poraz na gostovanju u Širokom! 🏀", excerpt: "Košarkaši Posušja upisali su poraz rezultatom 70:62 na gostovanju kod ekipe Širokog u 10. kolu Prvenstva.", content: "Poraz na gostovanju u Širokom. 🏀🌙\n\nKošarkaši Posušja jučer su igrali utakmicu 10. kola Prvenstva Herceg-Bosne protiv ekipe Širokog.\n\nKošarkaši Posušja su upisali poraz rezultatom 70:62, te se trenutno nalaze na 5. mjesto tablice. U 10. odigranih utakmica Žuti su ostvarili 4 pobjede i 6 poraza.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "23. 02. 2026.", category: "utakmica", image: porazSirokiAway, cardImagePosition: "center" },
  { id: 35, title: "Žuti sutra protiv Širokog II na Pecari! 📢", excerpt: "Pred našim košarkašima je novi prvenstveni izazov. Sutra momčad putuje na gostovanje kod ekipe Širokog II.", content: "Žuti sutra protiv Širokog II na Pecari! 🔥💪\n\nPred našim košarkašima je novi prvenstveni izazov. Sutra (nedjelja) momčad putuje na gostovanje kod ekipe Širokog II.\n\nUtakmica se igra s početkom u 17:00 sati u dvorani Pecara u Širokom Brijegu.\n\nPozivamo sve naše navijače koji su u mogućnosti da dođu podržati ekipu na ovom gostovanju. 🏀🏟️\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "21. 02. 2026.", category: "najava", image: najavasirokiAway, cardImagePosition: "bottom" },
  { id: 17, title: "Sponzorska suradnja sa Agencijom Laguna! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "18. 02. 2026.", category: "klub", image: newsLaguna, cardImage: newsLagunaCard },
  { id: 18, title: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🔥", excerpt: "Rezultatom 90:84 košarkaši Posušja ostvarili su važnu pobjedu na domaćem terenu protiv ekipe Mostara.", content: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🏀🔥\n\nRezultatom 90:84 košarkaši Posušja ostvarili su jako važnu pobjedu na domaćem terenu protiv ekipe Mostara. 🟡🏆\n\nU redovima Posušja istaknuo se Ante Begić koji je ubacio 18 poena uz 7 skokova. Odličnu partiju pružio je i Marko Protrka s 17 poena i 14 skokova, dok je Josip Ramljak dodao 16 poena i 6 asistencija. Ante Kovač je također odigrao zapaženu utakmicu s 11 poena, 7 skokova i 6 asistencija, a doprinos su dali i Mirko Đerek (11 poena, 4 asistencije) te Josip Pavković s 8 poena.\n\nHvala svima koji su došli podržati naše momke i vidimo se na sljedećoj utakmici! 👏🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "15. 02. 2026.", category: "utakmica", image: newsMostarCard, cardImage: newsMostarAction },
  { id: 26, title: "Žuti u nedjelju protiv Mostara! 📢", excerpt: "KK Posušje u nedjelju igra važnu domaću utakmicu protiv ekipe HKK Mostar u GSD Posušje!", content: "Žuti u nedjelju protiv Mostara na domaćem terenu! 🏀📢\n\nKK Posušje u nedjelju (15.02.) igra važnu domaću utakmicu protiv ekipe HKK Mostar! 🔥\n\n⏰ Početak utakmice: 19:00 sati\n📍 GSD Posušje\n\nOvo je jedna od ključnih utakmica u borbi za poziciju koja vodi u playoff i svaki bod je važan! 💪\n\nPozivamo sve navijače, prijatelje kluba i ljubitelje košarke da dođu i budu naš šesti igrač! Vidimo se u nedjelju – zajedno po pobjedu! 👏\n\nAjmo žuti! 🟡💪\n\n#ajmozuti #kkposusje", date: "13. 02. 2026.", category: "najava", image: najavaMostar, cardImage: cardNajavaMostar, cardImagePosition: "center" },
  { id: 19, title: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀", excerpt: "Košarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici.", content: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀\n\nKošarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici. Unatoč velikom angažmanu i borbenosti, žuti nisu uspjeli prevagnuti na svoju stranu u ključnim trenucima susreta. Rezultat je bio izuzetno blizak tijekom cijele utakmice, što pokazuje koliko su ekipe bile ujednačene.\n\nU redovima Posušja najbolji pojedinac bio je Marko Protrka s 15 poena, 7 skokova i 5 asistencija u samo 26 minuta na terenu. Mirko Đerek dodao je 13 poena uz 4 skoka i 4 asistencije, dok je Josip Pavković ubacio 8 poena s 5 skokova u 19 minuta. Luka Ramljak odigrao je svestranu utakmicu sa 7 poena, 4 skoka i 4 asistencije, a Ante Kovač je upisao 6 poena i 7 skokova. Ante Begić je dominirao pod obručima s čak 14 skokova uz 4 poena i 4 asistencije u 38 minuta.\n\nNa strani domaćina, HKK Tomislav predvodio je Boze Lučić s dominantnih 21 poen i 11 skokova. Kristijan Zrno dodao je 12 poena uz 3 asistencije, dok su Jure Jurić (11 poena, 3 skoka, 3 asistencije) i Gabrijel Bisko (10 poena, 5 skokova, 5 asistencija) također odigrali zapažene partije.\n\n🏀🔥 Žuti u nedjelju 15.2. igraju važnu domaću utakmicu protiv Mostara na domaćem terenu u 19h! Ovo je jedna od ključnih utakmica u borbi za poziciju koja vodi u playoff i svaki bod je važan! 💪🔥\n\nPozivamo sve navijače, prijatelje kluba i ljubitelje košarke da dođu i budu naš šesti igrač! Vidimo se u nedjelju – zajedno po pobjedu! 👏🏀\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "11. 02. 2026.", category: "utakmica", image: tomislavDetail, cardImage: tomislavCard },
  { id: 20, title: "Sponzorska suradnja s Weltplastom! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "08. 02. 2026.", category: "klub", image: newsWeltplastCard },
  { id: 22, title: "Nastavlja se prvenstvo KS Herceg-Bosne! 📢", excerpt: "Nakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama gostovanjem u Tomislavgradu!", content: "NASTAVLJA SE PRVENSTVO KS HERCEG-BOSNE! 🏀📢\n\nNakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama. 💪\n\nU sklopu nastavka natjecanja, našu momčad očekuje gostovanje u Tomislavgradu. 🚌\n\nUtakmica se igra u nedjelju (08.02) s početkom u 16h! ⏰\n\n🗓️ Nedjelja | 08.02.\n⏰ 16:00\n📍 SD Tomislavgrad\n\nOčekuje nas čvrsta i borbena utakmica! 🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "04. 02. 2026.", category: "najava", image: najavaTomislav, cardImage: cardNajavaTomislav, cardImagePosition: "center" },
  { id: 27, title: "Sponzorska suradnja s KTM Brinom! 🤝", excerpt: "S velikim ponosom objavljujemo da je poduzeće KTM Brina novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim ponosom objavljujemo da je poduzeće KTM Brina novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. 💪\n\nVeselimo se zajedničkim projektima, napretku i svim budućim uspjesima koje ćemo ostvariti zajedno! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "22. 01. 2026.", category: "klub", image: sponzorKtmBrina },
  { id: 23, title: "Polufinale Kupa KS Herceg-Bosne! 🏆", excerpt: "Košarkaši KK Posušje sutra izlaze na parket u borbi za finale protiv HKK Široki!", content: "POLUFINALE KUPA SAVEZA HERCEG-BOSNE! 🏆🔥\n\nKošarkaši KK Posušje sutra izlaze na parket u borbi za finale! 💪🏀\n\nU polufinalu KS Herceg-Bosne našu momčad očekuje izuzetno zahtjevan susret protiv HKK Široki, prve ekipe Širokog. 🔥\n\n⏰ Utorak, 20.01. u 20:00 sati\n📍 GSD Posušje\n\nU drugom polufinalnom susretu snage će odmjeriti drugoligaš HKK Mostar i prvoligaš HKK Zrinski. 🏀\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "19. 01. 2026.", category: "najava", image: najavaKupSiroki, cardImage: cardNajavaKupSiroki, cardImagePosition: "center" },
  { id: 28, title: "Juniori KK Posušje turnir u Sarajevu otvorili pobjedom! ⛹️", excerpt: "Juniori KK Posušje započeli nastup na međunarodnom košarkaškom turniru u Sarajevu pobjedom nad Šentvidom 48:43!", content: "Juniori KK Posušje turnir u Sarajevu otvorili pobjedom! 🏀⛹️\n\nJuniori KK Posušje danas su započeli nastup na međunarodnom košarkaškom turniru u Sarajevu (Ilidža), koji se održava od 3. do 5. siječnja 2026. Turnir je započeo danas, a naši juniori su u prvoj utakmici svladali ekipu Šentvid (Slovenija) rezultatom 48:43. 🏆\n\nVrijedi istaknuti kako se ovaj turnir igra u isto vrijeme dok se selekcije U14 i U16 KK Posušje nalaze u Njemačkoj na internacionalnom Alba Berlin Winterturniru, što predstavlja veliki pothvat za KK Posušje na koji smo svi ponosni. 💪\n\nNaši juniori nalaze se u skupini s ekipama:\n\n• Borec Basket Veles (Sjeverna Makedonija)\n• BC Invaders (Albanija)\n• Fast Academy Spor Okolu (Bugarska)\n\n📅 Raspored utakmica:\n⏰ Danas u 19:30 protiv BC Invaders\n⏰ Sutra u 14:50 protiv Borec Basket Veles\n⏰ Sutra u 19:30 – posljednja utakmica grupne faze\n\nU skladu s dobrom suradnjom s HKK Mostar, za ekipu Posušja nastupaju i Robert Grizelj, Ivano Vidić i Ante Raspudić. Momčad vodi Ivo Begić, uz pomoć trenera Borne Peljkovića. 🤝\n\nSretno dalje našim juniorima! 🟡💪\n\n#kkposusje #ajmozuti", date: "03. 01. 2026.", category: "utakmica", image: junioriSarajevo, cardImage: cardJunioriSarajevo },
  { id: 29, title: "Vokel zlatni sponzor našeg kluba! 🤝", excerpt: "S velikim ponosom objavljujemo da je Vokel postao zlatni sponzor našeg kluba!", content: "Vokel zlatni sponzor našeg kluba! 🤝✨\n\nS velikim ponosom objavljujemo da je Vokel postao ZLATNI SPONZOR našeg kluba! 🏆\n\nOva suradnja predstavlja snažan iskorak i veliku podršku razvoju sporta, mladih talenata i ambicija našeg kluba. Povjerenje koje nam je Vokel ukazao daje nam dodatni vjetar u leđa na putu prema novim pobjedama i uspjesima. 💪\n\nHvala Vokelu što je prepoznao našu viziju, trud i strast prema košarci. Radujemo se zajedničkim projektima, dugoročnoj suradnji i stvaranju zlatnih trenutaka – zajedno! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti #vokel #zlatnisponzor #zajednojači", date: "18. 12. 2025.", category: "klub", image: sponzorVokel },
  { id: 30, title: "Sponzorska suradnja s Mrvelji! 🤝", excerpt: "S ponosom objavljujemo da je tvrtka Mrvelji postala brončani sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS ponosom objavljujemo da je tvrtka Mrvelji postala brončani sponzor našeg kluba. 🏆\n\nZahvaljujemo na ukazanom povjerenju i podršci razvoju sporta u našem kraju. 💪\n\nRadujemo se zajedničkim projektima i budućim uspjesima! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti #mrvelji", date: "15. 12. 2025.", category: "klub", image: sponzorMrvelji },
  { id: 31, title: "Poraz Posušja u Ljubuškom! 🏀", excerpt: "Košarkaši Posušja nakon infarktne završnice poraženi su od Ljubuškog rezultatom 85:81 u vjerojatno najboljoj utakmici sezone.", content: "Poraz Posušja u Ljubuškom! 🏀\n\nKošarkaši Posušja nakon infarktne završnice poraženi su od Ljubuškog, trenutno vodeće momčadi Prvenstva, rezultatom 85:81, u vjerovatno najboljoj utakmici dosadašnjeg dijela sezone.\n\nU redovima Posušja posebno se istakao Ante Kovač, koji je odigrao utakmicu života i postigao čak 36 poena. Nakon slabijeg prvog poluvremena, Kovač je u trećoj četvrtini sam ubacio 19 poena i vratio našu ekipu u potpunosti u utakmicu. Nažalost, u samoj završnici nedostajalo je malo sportske sreće za veliku pobjedu.\n\nAjmo žuti! 🟡💪\n\n#ajmozuti #kkposusje #kshercegbosne #ljubuski", date: "14. 12. 2025.", category: "utakmica", image: newsPorazLjubuski, cardImage: newsPorazLjubuskiCard, cardImagePosition: "center" },
  { id: 24, title: "Danas igra Posušje! 📢", excerpt: "Žuti večeras od 19 sati protiv Ljubuškog u SD Ljubuški! 📺 Prijenos na YouTube kanalu Sport Hercegovina!", content: "Danas igra Posušje! 🏀📢\n\nŽuti večeras od 19 sati protiv Ljubuškog! ⏰\n\n📍 SD Ljubuški\n📺 Prijenos utakmice na YouTube kanalu Sport Hercegovina\n\nAjmo Žuti! 💪🟡\n\n#ajmozuti #kkposusje #kshercegbosne #ljubuski", date: "14. 12. 2025.", category: "najava", image: najavaLjubuskiGameday, cardImage: cardNajavaLjubuskiGameday, cardImagePosition: "lower" },
  { id: 25, title: "Žuti u nedjelju protiv Ljubuškog! 📢", excerpt: "Košarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva KS Herceg-Bosne protiv ekipe Ljubuškog!", content: "Žuti u nedjelju protiv Ljubuškog! 🏀📢\n\nKošarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva Košarkaškog saveza Herceg-Bosne protiv ekipe Ljubuškog! 🔥\n\nŽuti do sada u odigranih 6 kola imaju 3 pobjede i 3 poraza, dok ekipa Ljubuškog ima 5 pobjeda i 1 poraz. 📊\n\n📍 SD Ljubuški\n⏰ 19h\n📺 YouTube: SportHercegovina\n\nAjmo žuti! 🟡💪\n\n#kkposusje #kkljubuski #kshercegbosne #ajmozuti", date: "11. 12. 2025.", category: "najava", image: najavaLjubuski, cardImage: cardNajavaLjubuski, cardImagePosition: "center" },
  { id: 32, title: "Službena oprema – Božićno darivanje HKK Posušje! 🎄", excerpt: "Naruči svoj ili pokloni dragoj osobi pravi klupski Božićni dar! Košarkaški klub Posušje pripremio je nagradnu igru i naručivanje službene opreme!", content: "🎄 SLUŽBENA OPREMA – BOŽIĆNO DARIVANJE KK POSUŠJE 🎄\n\nNaruči svoj ili pokloni dragoj osobi pravi klupski Božićni dar. 🎁👏\n\nKošarkaški klub Posušje pripremio je nagradnu igru i omogućio je svim članovima i navijačima naručivanje službene opreme za sezonu 2025./26., savršene kao Božićni poklon za sebe ili dragu osobu. 🎁👏\n\nNaručivanje je moguće putem sljedećeg linka:\n👉 https://forms.gle/N55CEmVoZzZvXGmz5\n\nPripremili smo i Božićno darivanje u kojem darujemo:\n1. Službenu Trenerku KK Posušje, sezona 2025/26 (komplet),\n2. Duks KK Posušje, sezona 2025/26\n3. Majica kratkih rukava KK Posušje, sezona 2025/26\n\n*Nagradna igra vrijedi samo za instagram\n\nZa sudjelovanje je potrebno:\n1. Zapratiti stranicu KK Posušje i stranicu @josipvranjkovic.studio,\n2. Lajkati objavu i u komentaru označiti dvije osobe (moguće je sudjelovati više puta uz označavanje novih osoba).\n3. Za povećanje šanse u nagradnoj igri možete podijeliti objavu na svoj story (nije obavezno).\n\n📸 Veliko hvala Josipu Vranjkoviću na vrhunskim fotografijama! @josipvranjkovic.studio\n\nDobitnike izvlačimo 24. prosinca, dok narudžbe službene opreme primamo do 20.12. (subota).\n\nSretno svima! 🎄 🤍💛\n\n#kkposusje #ajmozuti", date: "12. 12. 2025.", category: "klub", image: xmasHero, cardImage: xmasCard, galleryImages: [xmas1, xmas2, xmas3, xmas4, xmas5, xmas6, xmas7, xmas8] },
  { id: 33, title: "Sponzorska suradnja s Mivikom! 🤝", excerpt: "S velikim ponosom objavljujemo da je Miviko novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim ponosom objavljujemo da je Miviko postao novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. 💪\n\nVeselimo se zajedničkim projektima, napretku i svim budućim uspjesima koje ćemo ostvariti zajedno! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti #miviko", date: "06. 12. 2025.", category: "klub", image: sponzorMiviko },
  { id: 34, title: "Sponzorska suradnja s Planetom! 🤝", excerpt: "S ponosom objavljujemo da je Planet novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS ponosom objavljujemo da je Planet postao srebreni sponzor našeg kluba. 🏆\n\nZahvaljujemo na ukazanom povjerenju i podršci razvoju sporta u našem kraju. 💪\n\nRadujemo se zajedničkim projektima i budućim uspjesima! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "29. 11. 2025.", category: "klub", image: sponzorPlanet },
];

const categories = [
  { id: "sve", label: "Sve", icon: Newspaper },
  { id: "utakmica", label: "Utakmice", icon: Trophy },
  { id: "najava", label: "Najave", icon: Megaphone },
  { id: "klub", label: "Klub", icon: Newspaper },
] as const;

const getCategoryLabel = (cat: string) => {
  const found = categories.find(c => c.id === cat);
  return found?.label || cat;
};

const ArticleDetail = ({ article }: { article: NewsItem }) => {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = article.galleryImages || [];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background" style={{ zoom: 0.9 }}>
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <button onClick={() => navigate("/vijesti")} className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad na vijesti</span>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded mb-4">{getCategoryLabel(article.category)}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary mb-4">{article.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <Calendar size={16} />
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{getCategoryLabel(article.category)}</span>
            </div>
            
            <div className="relative overflow-hidden rounded-lg mb-8">
              <img src={article.image} alt={article.title} className="w-full rounded-lg" />
            </div>

            <div className="prose prose-invert max-w-none">
              {article.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-foreground/90 text-lg leading-relaxed mb-4">
                  {paragraph.split('\n').map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              ))}
            </div>

            {galleryImages.length > 0 && (
              <div className="mt-8 columns-2 md:columns-3 gap-3">
                {galleryImages.map((img, i) => (
                  <img key={i} src={img} alt={`${article.title} - slika ${i + 1}`} className="w-full rounded-lg mb-3 break-inside-avoid cursor-pointer hover:opacity-90 transition-opacity" onClick={() => openLightbox(i)} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} onClick={closeLightbox} className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10">
              <X className="w-6 h-6" />
            </motion.button>
            <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <img src={galleryImages[currentIndex]} alt={`Slika ${currentIndex + 1}`} className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-4 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-10">
              <ChevronRight className="w-8 h-8" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-foreground/70 text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NewsPage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("sve");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (articleId) {
    const article = allNews.find(n => n.id === parseInt(articleId));
    if (article) return <ArticleDetail article={article} />;
  }

  const filteredNews = activeCategory === "sve" ? allNews : allNews.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background" style={{ zoom: 0.9 }}>
      <div className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <button onClick={() => { sessionStorage.setItem("restoreHomeScroll", "true"); navigate("/"); }} className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-8 text-lg">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-display tracking-wider text-xl">Nazad</span>
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4">
              <span className="text-white">NAJNOVIJE </span>
              <span className="text-primary">VIJESTI</span>
            </h1>
            <p className="text-muted-foreground text-lg">Ostani u toku sa svim događanjima iz kluba</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-foreground hover:bg-secondary hover:text-primary"}`}>
                  <IconComponent size={18} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredNews.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Link to={`/vijesti/${item.id}`} className="group block bg-background rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover-lift border border-transparent hover:border-primary/30">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.cardImage || item.image} alt={item.title} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${item.cardImagePosition === 'center' ? 'object-center' : item.cardImagePosition === 'upper' ? 'object-[center_5%]' : item.cardImagePosition === 'top' ? 'object-top' : item.cardImagePosition === 'lower' ? 'object-[center_35%]' : item.cardImagePosition === 'bottom' ? 'object-bottom' : 'object-[center_25%]'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded flex items-center gap-1 font-bold">
                      {(() => { const cat = item.category; const icons: Record<string, typeof Trophy> = { utakmica: Trophy, najava: Megaphone, klub: Newspaper }; const labels: Record<string, string> = { utakmica: "Utakmice", najava: "Najave", klub: "Klub" }; const Icon = icons[cat]; return <><Icon size={12} strokeWidth={3} />{labels[cat]}</>; })()}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-display text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                    <div className="mt-auto inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      Pročitaj više <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
