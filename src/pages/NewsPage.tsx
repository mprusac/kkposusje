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
import porazSirokiCard from "@/assets/news-poraz-siroki-card.jpg";
import berlinCardNew from "@/assets/berlin/berlin-card-new.jpg";
import berlin1 from "@/assets/berlin/berlin-1.jpg";
import berlin2 from "@/assets/berlin/berlin-2.jpg";
import berlin3 from "@/assets/berlin/berlin-3.jpg";
import berlin4 from "@/assets/berlin/berlin-4.jpg";
import berlin5 from "@/assets/berlin/berlin-5.jpg";
import berlin6 from "@/assets/berlin/berlin-6.jpg";
import berlin7 from "@/assets/berlin/berlin-7.jpg";
import berlin8 from "@/assets/berlin/berlin-8.jpg";
import berlin9 from "@/assets/berlin/berlin-9.jpg";
import deFlag from "@/assets/flags/de-flag.png";
import pobjeda_RamaCard from "@/assets/news-pobjeda-rama-card.jpg";
import priznanjeCard from "@/assets/news-priznanje-card.jpg";
import priznanjeProtrka from "@/assets/priznanje-protrka.jpg";
import priznanjeKadeti from "@/assets/priznanje-kadeti.jpg";
import najavaGrude from "@/assets/news-najava-grude.jpg";
import najavaGrudeGameday from "@/assets/news-najava-grude-gameday.jpg";
import pobjeda_GrudeCard from "@/assets/news-pobjeda-grude-card.jpg";
import sponzorCalipso from "@/assets/news-sponzor-calipso.jpg";
import najavaCapljina from "@/assets/news-najava-capljina-gameday.jpg";
import pobjedaCapljina from "@/assets/news/capljina-result-march2026.jpg";
import pobjedaLjubuski from "@/assets/news/ljubuski-result-march2026.jpg";
import josipMamicHks from "@/assets/news/josip-mamic-hks.jpg";

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
  flagImage?: string;
}

const allNews: NewsItem[] = [
  { id: 47, title: "Josip Mamić na radaru HKS-a! 🇭🇷", excerpt: "S velikim ponosom objavljujemo vijest da je naš talentirani predkadet Josip Mamić dobio službeni poziv Hrvatskog košarkaškog saveza!", content: "POZIV U REPREZENTACIJU: Josip Mamić na radaru HKS-a! 🇭🇷\n\nS velikim ponosom objavljujemo vijest da je naš talentirani predkadet, Josip Mamić, dobio službeni poziv Hrvatskog košarkaškog saveza za sudjelovanje na kontrolnom treningu regije JUG!\n\nOvo veliko priznanje potvrda je predanog rada u omladinskom pogonu našeg kluba. Kontrolni trening održao se ovog četvrtka, 19. ožujka, u kultnoj sportskoj dvorani Baldekin u Šibeniku.\n\nJosipu želimo puno sreće i uspjeha u nastavku – sigurni smo da će dostojno predstaviti sebe i žuti dres KK Posušje!\n\nAjmo žuti! 💪\n\n#ajmozuti #kkposusje", date: "22. 03. 2026.", category: "klub", image: josipMamicHks, cardImage: josipMamicHks, cardImagePosition: "top" },
  { id: 46, title: "Pobjeda Žutih u posljednjoj utakmici sezone! 🌕⚫", excerpt: "Košarkaši Posušja pobjedili su ekipu Ljubuškog rezultatom 88:78 u posljednjem kolu regularnog dijela sezone.", content: "Pobjeda Žutih u posljednjoj utakmici sezone! 🌕⚫\n\nKošarkaši Posušja pobjedili su ekipu Ljubuškog rezultatom 88:78 u posljednjem kolu regularnog dijela sezone košarkaškog Prvenstva KS Herceg-Bosne.\n\nNajbolji pojedinac susreta bio je Josip Ramljak sa 26 postignutih poena. Ante Begić je ubacio 16 poena, dok je Ante Kovač postigao 15 poena.\n\nAjmo žuti!\n\n#kkposusje #ajmozuti", date: "20. 03. 2026.", category: "utakmica", image: pobjedaLjubuski, cardImage: pobjedaLjubuski, cardImagePosition: "bottom" },
  { id: 45, title: "Pobjeda nad Čapljinom! 🌕⚫", excerpt: "Košarkaši Posušja jučer su na domaćem terenu ostvarili pobjedu nad ekipom Čapljine rezultatom 83:61.", content: "Pobjeda nad Čapljinom! 🌕⚫\n\nKošarkaši Posušja jučer su na domaćem terenu ostvarili pobjedu nad ekipom Čapljine rezultatom 83:61.\n\nTreba istaknuti da je u ovoj utakmici naš kadet Marko Petrović odlično iskoristio dobivenu minutažu te postigao 19 poena.\n\nOvo je 'žutima' bila predzadnja utakmica ove sezone. Posljednji susret odigrat će u petak protiv ekipe Ljubuškog, također na domaćem parketu.\n\nAjmo, 'žuti'! 💪\n\n#KKPosusje #AjmoZuti", date: "18. 03. 2026.", category: "utakmica", image: pobjedaCapljina, cardImage: pobjedaCapljina, cardImagePosition: "bottom" },
  { id: 44, title: "Žuti sutra protiv Čapljine na domaćem terenu! 🌕⚫", excerpt: "Košarkaši Posušja sutra igraju predzadnju utakmicu ove sezone. Na domaćem terenu igramo protiv ekipe Čapljine.", content: "Žuti sutra protiv Čapljine na domaćem terenu! 🌕⚫\n\nKošarkaši Posušja sutra igraju predzadnju utakmicu ove sezone. Na domaćem terenu igramo protiv ekipe Čapljine.\n\nUtakmica kreće u 19:00h!\n\nNažalost, ovaj vikend pobjedama Tomislava i Gruda, žuti su ostali bez šanse za ulazak u Playoff, te će sezonu završiti utakmicom protiv Ljubuškog.\n\nAjmo žuti! 💪\n\n#kkposusje #ajmozuti", date: "16. 03. 2026.", category: "najava", image: najavaCapljina, cardImage: najavaCapljina, cardImagePosition: "bottom" },
  { id: 43, title: "Sponzorska suradnja sa Caffe Bar Calipso! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo suradnju sa Caffe Bar Calipso! Hvala na ukazanom povjerenju i podršci!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo suradnju sa Caffe Bar Calipso!\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti!\n\nAjmo žuti! 💪\n\n#kkposusje #ajmozuti", date: "10. 03. 2026.", category: "klub", image: sponzorCalipso, cardImage: sponzorCalipso, cardImagePosition: "center" },
  { id: 42, title: "Pobjeda!!! 🏀🔥", excerpt: "Košarkaši Posušja rezultatom 80:67 upisali su važnu pobjedu na domaćem terenu protiv ekipe Gruda!", content: "POBJEDA!!! 🏀🔥\n\nKošarkaši Posušja rezultatom 80:67 upisali su važnu pobjedu na domaćem terenu protiv ekipe Gruda!\n\nNakon lošeg otvaranja utakmice, žuti se vraćaju, te u posljednjoj četvrtini koševi Ante Begića, Josipa Ramljaka i Marka Protrke rješava se pitanje pobjednika.\n\nŽuti ostaju u igri za Play-Off, ali i dalje ne ovise samo o sebi, nakon što je ekipa Tomislava kao glavni konkurent Žutima za ulazak u Play-Off na domaćem terenu pobjedila ekipu Ljubuškog rezultatom 85-84.\n\nAjmo žuti!\n\n#kkposusje #ajmozuti", date: "08. 03. 2026.", category: "utakmica", image: pobjeda_GrudeCard, cardImage: pobjeda_GrudeCard, cardImagePosition: "bottom" },
  { id: 41, title: "Veliki susjedski derbi: Borba za PlayOff! 🔥", excerpt: "Košarkaši Posušja ove nedjelje igraju važnu utakmicu u kojoj nam u goste stiže ekipa Gruda!", content: "VELIKI SUSJEDSKI DERBI: BORBA ZA PLAYOFF! 🔥\n\nKošarkaši Posušja ove nedjelje igraju važnu utakmicu u kojoj nam u goste stiže ekipa Gruda! 🏀👊\n\nNaši \"Žuti\" s omjerom 5-6 trenutno drže 5. mjesto na tablici. S obzirom na to da samo prva 4 mjesta vode u PlayOff, svaka sljedeća utakmica je finale, a prva prepreka su Grude. 🏆\n\nPozivamo sve navijače i prijatelje. Dođite, budite naš šesti igrač na tribinama i nosite ekipu do pobjede koja nas ostavlja u igri za vrh! 🏀🔥\n\n📍 Lokacija: GSD Posušje\n🗓️ Dan: Nedjelja\n⏰ Vrijeme: 19:00 sati\n\nSvi u dvoranu! Pokažimo kako se navija za svoj klub!\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "05. 03. 2026.", category: "najava", image: najavaGrudeGameday, cardImagePosition: "bottom" },
  { id: 40, title: "Susjedski derbi i nagradna igra! 🔥🏀", excerpt: "U nedjelju 8. ožujka u 19:00 sati GSD Posušje postaje poprište borbe za PlayOff! Uz utakmicu i bogata nagradna igra!", content: "SUSJEDSKI DERBI I VELIKA NAGRADNA IGRA! 🔥🏀\n\nPred nama je jedna od ključnih utakmica sezone. U nedjelju, 8. ožujka u 19:00 sati, GSD Posušje postaje poprište borbe za PlayOff.\n\nNašim košarkašima, koji trenutno drže peto mjesto, pobjeda protiv susjeda iz Gruda imperativ je za ulazak među četiri najbolje ekipe prvenstva. 💪\n\nUz sportski spektakl na parketu, ovaj susret donosi i bogatu nagradnu igru za posjetitelje. 🎁\n\n*NAPOMENA* – Sudjelovanje u nagradnoj igri ostvaruje se kupnjom ulaznice. Cijena ulaznice je 5,00 KM.\n\n🏆 SPONZOR UTAKMICE: RESTORAN BOSILJNA\nPonosno najavljujemo suradnju s Restoranom Bosiljna, koji je kao generalni sponzor utakmice ujedno osigurao i vrijednu glavnu nagradu za najsretnije gledatelje:\n\n🥇 Glavna nagrada: Večera za 4 osobe u Restoranu Bosiljna\n🥈 2. nagrada: Službena trenerka KK Posušje\n🥉 3. nagrada: Klupski duks i ruksak KK Posušje\n\nPozivamo sve navijače i ljubitelje košarke da svojim dolaskom uveličaju ovaj sportski događaj i pruže potrebnu podršku \"Žutima\" u ključnom trenutku sezone.\n\n📍 Lokacija: GSD Posušje\n🗓️ Vrijeme: Nedjelja, 19:00 sati\n\nZajedno do cilja. Ajmo Žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "04. 03. 2026.", category: "najava", image: najavaGrude, cardImagePosition: "center" },
  { id: 39, title: "Veliko priznanje za naš klub! 🏆", excerpt: "Na svečanoj dodjeli priznanja Športskog saveza općine Posušje, naš KK Posušje pokupio je važne nagrade!", content: "VELIKO PRIZNANJE ZA NAŠ KLUB! 🏆👏\n\nNa današnjoj svečanoj dodjeli priznanja Športskog saveza općine Posušje, naš KK Posušje pokupio je važne nagrade! 🏅\n\n🏅 KADETI – Najbolji sportski kolektiv u 2025. godini!\nNagrada stiže kao kruna izvanredne sezone i osvojenog 1. mjesta u Ligi Herceg-Bosne za mlade. Momci su sjajnim timskim radom i dominacijom potvrdili kvalitetan stručni rad i sustavan razvoj mladih igrača u našem klubu.\n\n🌟 MARKO PROTRKA – Junior godine!\nNaš Marko nagrađen je za fantastičnu godinu u kojoj je, uz klupske uspjehe, s reprezentacijom BiH nastupio na FIBA EuroBasketu u Rumunjskoj i osvojio odlično 7. mjesto u B diviziji.\n\nIskrene čestitke našim dobitnicima, trenerima i svima koji podržavaju rad kluba!\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "04. 03. 2026.", category: "klub", image: priznanjeCard, cardImage: priznanjeCard, cardImagePosition: "center", galleryImages: [priznanjeCard, priznanjeProtrka, priznanjeKadeti] },
  { id: 38, title: "Pobjeda Žutih u Rami! 🏀🔥", excerpt: "Košarkaši Posušja ostvarili su uvjerljivu pobjedu rezultatom 60:94 na gostovanju u Rami u 11. kolu Prvenstva.", content: "Pobjeda Žutih u Rami! 🏀🔥\n\nKošarkaši Posušja danas su na gostovanju u Rami odigrali utakmicu 11. kola Prvenstva KS Herceg-Bosne, te ostvarili uvjerljivu pobjedu rezultatom 60:94.\n\nOvom pobjedom Košarkaši Posušja ostali su u igri za Play-Off koji nam se polako približava! 🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "01. 03. 2026.", category: "utakmica", image: pobjeda_RamaCard, cardImagePosition: "bottom" },
  { id: 36, title: "Poraz na gostovanju u Širokom! 🏀", excerpt: "Košarkaši Posušja upisali su poraz rezultatom 70:62 na gostovanju kod ekipe Širokog u 10. kolu Prvenstva.", content: "Poraz na gostovanju u Širokom. 🏀🌙\n\nKošarkaši Posušja jučer su igrali utakmicu 10. kola Prvenstva Herceg-Bosne protiv ekipe Širokog.\n\nKošarkaši Posušja su upisali poraz rezultatom 70:62, te se trenutno nalaze na 5. mjesto tablice. U 10. odigranih utakmica Žuti su ostvarili 4 pobjede i 6 poraza.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "23. 02. 2026.", category: "utakmica", image: porazSirokiAway, cardImage: porazSirokiCard, cardImagePosition: "center" },
  { id: 35, title: "Žuti sutra protiv Širokog II na Pecari! 📢", excerpt: "Pred našim košarkašima je novi prvenstveni izazov. Sutra momčad putuje na gostovanje kod ekipe Širokog II.", content: "Žuti sutra protiv Širokog II na Pecari! 🔥💪\n\nPred našim košarkašima je novi prvenstveni izazov. Sutra (nedjelja) momčad putuje na gostovanje kod ekipe Širokog II.\n\nUtakmica se igra s početkom u 17:00 sati u dvorani Pecara u Širokom Brijegu.\n\nPozivamo sve naše navijače koji su u mogućnosti da dođu podržati ekipu na ovom gostovanju. 🏀🏟️\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "21. 02. 2026.", category: "najava", image: najavasirokiAway, cardImagePosition: "bottom" },
  { id: 17, title: "Sponzorska suradnja sa Agencijom Laguna! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo da je poduzeće Agencija Laguna novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "18. 02. 2026.", category: "klub", image: newsLaguna, cardImage: newsLagunaCard },
  { id: 18, title: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🔥", excerpt: "Rezultatom 90:84 košarkaši Posušja ostvarili su važnu pobjedu na domaćem terenu protiv ekipe Mostara.", content: "Pobjeda Posušja nakon produžetaka protiv Mostara! 🏀🔥\n\nRezultatom 90:84 košarkaši Posušja ostvarili su jako važnu pobjedu na domaćem terenu protiv ekipe Mostara. 🟡🏆\n\nU redovima Posušja istaknuo se Ante Begić koji je ubacio 18 poena uz 7 skokova. Odličnu partiju pružio je i Marko Protrka s 17 poena i 14 skokova, dok je Josip Ramljak dodao 16 poena i 6 asistencija. Ante Kovač je također odigrao zapaženu utakmicu s 11 poena, 7 skokova i 6 asistencija, a doprinos su dali i Mirko Đerek (11 poena, 4 asistencije) te Josip Pavković s 8 poena.\n\nHvala svima koji su došli podržati naše momke i vidimo se na sljedećoj utakmici! 👏🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "15. 02. 2026.", category: "utakmica", image: newsMostarCard, cardImage: newsMostarAction },
  { id: 26, title: "Žuti u nedjelju protiv Mostara! 📢", excerpt: "KK Posušje u nedjelju igra važnu domaću utakmicu protiv ekipe HKK Mostar u GSD Posušje!", content: "Žuti u nedjelju protiv Mostara na domaćem terenu! 🏀📢\n\nKK Posušje u nedjelju (15.02.) igra važnu domaću utakmicu protiv ekipe HKK Mostar! 🔥\n\n⏰ Početak utakmice: 19:00 sati\n📍 GSD Posušje\n\nOvo je jedna od ključnih utakmica u borbi za poziciju koja vodi u playoff i svaki bod je važan! 💪\n\nPozivamo sve navijače, prijatelje kluba i ljubitelje košarke da dođu i budu naš šesti igrač! Vidimo se u nedjelju – zajedno po pobjedu! 👏\n\nAjmo žuti! 🟡💪\n\n#ajmozuti #kkposusje", date: "13. 02. 2026.", category: "najava", image: najavaMostar, cardImage: cardNajavaMostar, cardImagePosition: "center" },
  { id: 19, title: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀", excerpt: "Košarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici.", content: "Poraz Posušja na gostovanju u Tomislavgradu! 🏀\n\nKošarkaši Posušja poraženi su rezultatom 60:55 na gostovanju kod HKK Tomislav u tijesnoj i borbenoj utakmici. Unatoč velikom angažmanu i borbenosti, žuti nisu uspjeli prevagnuti na svoju stranu u ključnim trenucima susreta. Rezultat je bio izuzetno blizak tijekom cijele utakmice, što pokazuje koliko su ekipe bile ujednačene.\n\nU redovima Posušja najbolji pojedinac bio je Marko Protrka s 15 poena, 7 skokova i 5 asistencija u samo 26 minuta na terenu. Mirko Đerek dodao je 13 poena uz 4 skoka i 4 asistencije, dok je Josip Pavković ubacio 8 poena s 5 skokova u 19 minuta. Luka Ramljak odigrao je svestranu utakmicu sa 7 poena, 4 skoka i 4 asistencije, a Ante Kovač je upisao 6 poena i 7 skokova. Ante Begić je dominirao pod obručima s čak 14 skokova uz 4 poena i 4 asistencije u 38 minuta.\n\nNa strani domaćina, HKK Tomislav predvodio je Boze Lučić s dominantnih 21 poen i 11 skokova. Kristijan Zrno dodao je 12 poena uz 3 asistencije, dok su Jure Jurić (11 poena, 3 skoka, 3 asistencije) i Gabrijel Bisko (10 poena, 5 skokova, 5 asistencija) također odigrali zapažene partije.\n\n🏀🔥 Žuti u nedjelju 15.2. igraju važnu domaću utakmicu protiv Mostara na domaćem terenu u 19h! Ovo je jedna od ključnih utakmica u borbi za poziciju koja vodi u playoff i svaki bod je važan! 💪🔥\n\nPozivamo sve navijače, prijatelje kluba i ljubitelje košarke da dođu i budu naš šesti igrač! Vidimo se u nedjelju – zajedno po pobjedu! 👏🏀\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "11. 02. 2026.", category: "utakmica", image: tomislavDetail, cardImage: tomislavCard },
  { id: 20, title: "Sponzorska suradnja s Weltplastom! 🤝", excerpt: "S velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim zadovoljstvom objavljujemo da je poduzeće Weltplast novi brončani sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. Vaša podrška dodatni je vjetar u leđa našim igračima i motivacija za nove pobjede!\n\nRadujemo se zajedničkim projektima, napretku i svim uspjesima koje ćemo zajedno ostvariti.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "08. 02. 2026.", category: "klub", image: newsWeltplastCard },
  { id: 22, title: "Nastavlja se prvenstvo KS Herceg-Bosne! 📢", excerpt: "Nakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama gostovanjem u Tomislavgradu!", content: "NASTAVLJA SE PRVENSTVO KS HERCEG-BOSNE! 🏀📢\n\nNakon zimske pauze, košarkaši KK Posušje vraćaju se prvenstvenim obvezama. 💪\n\nU sklopu nastavka natjecanja, našu momčad očekuje gostovanje u Tomislavgradu. 🚌\n\nUtakmica se igra u nedjelju (08.02) s početkom u 16h! ⏰\n\n🗓️ Nedjelja | 08.02.\n⏰ 16:00\n📍 SD Tomislavgrad\n\nOčekuje nas čvrsta i borbena utakmica! 🔥\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "04. 02. 2026.", category: "najava", image: najavaTomislav, cardImage: cardNajavaTomislav, cardImagePosition: "center" },
  { id: 27, title: "Sponzorska suradnja s KTM Brinom! 🤝", excerpt: "S velikim ponosom objavljujemo da je poduzeće KTM Brina novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim ponosom objavljujemo da je poduzeće KTM Brina novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. 💪\n\nVeselimo se zajedničkim projektima, napretku i svim budućim uspjesima koje ćemo ostvariti zajedno! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "22. 01. 2026.", category: "klub", image: sponzorKtmBrina },
  { id: 23, title: "Polufinale Kupa KS Herceg-Bosne! 🏆", excerpt: "Košarkaši KK Posušje sutra izlaze na parket u borbi za finale protiv HKK Široki!", content: "POLUFINALE KUPA SAVEZA HERCEG-BOSNE! 🏆🔥\n\nKošarkaši KK Posušje sutra izlaze na parket u borbi za finale! 💪🏀\n\nU polufinalu KS Herceg-Bosne našu momčad očekuje izuzetno zahtjevan susret protiv HKK Široki, prve ekipe Širokog. 🔥\n\n⏰ Utorak, 20.01. u 20:00 sati\n📍 GSD Posušje\n\nU drugom polufinalnom susretu snage će odmjeriti drugoligaš HKK Mostar i prvoligaš HKK Zrinski. 🏀\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "19. 01. 2026.", category: "najava", image: najavaKupSiroki, cardImage: cardNajavaKupSiroki, cardImagePosition: "center" },
  { id: 37, title: "ALBA Berlin Winterturnier 2026!", excerpt: "Škola košarke KK Posušje sretno se vratila kući nakon 4 dana boravka u Berlinu, gdje su selekcije U-14 i U-16 sudjelovale na prestižnom ALBA Berlin Winterturnieru 2026!", content: "ALBA Berlin Winterturnier 2026!\n\nS ponosom objavljujemo kako se naša škola košarke sretno vratila kući nakon 4 dana boravka u Berlinu, gdje su selekcije U-14 i U-16 sudjelovale na prestižnom ALBA Berlin Winterturnieru 2026, što ujedno predstavlja prvo međunarodno putovanje u povijesti škole košarke KK Posušje.\n\nZa mlade košarkaše ovaj turnir znači mnogo više od samih utakmica. Riječ je o neprocjenjivom sportskom i životnom iskustvu – novim poznanstvima, susretu s drugačijom sportskom kulturom, jačanju samopouzdanja te stvaranju uspomena koje će nositi cijeli život. Natjecanje s ekipama iz jakog europskog košarkaškog okruženja predstavlja snažan poticaj za daljnji razvoj i motivaciju mladih sportaša.\n\nPosebnu vrijednost ovom nastupu daje činjenica da je ovo prvi korak strateške suradnje KK Posušje s ALBOM Berlin.\n\nKlub će u budućnosti kroz ovakve projekte nastojati sustavno graditi budućnost kluba kroz rad s mladima, ulažući u njihovo sportsko, ali i osobno odrastanje. Ovi nastupi predstavljaju važan korak naprijed, kako za mlade selekcije, tako i za cjelokupni razvoj kluba.\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti", date: "05. 01. 2026.", category: "klub", image: berlin1, cardImage: berlinCardNew, flagImage: deFlag, galleryImages: [berlin1, berlin2, berlin3, berlin4, berlin5, berlin6, berlin7, berlin8, berlin9] },
  { id: 28, title: "Juniori KK Posušje turnir u Sarajevu otvorili pobjedom! ⛹️", excerpt: "Juniori KK Posušje započeli nastup na međunarodnom košarkaškom turniru u Sarajevu pobjedom nad Šentvidom 48:43!", content: "Juniori KK Posušje turnir u Sarajevu otvorili pobjedom! 🏀⛹️\n\nJuniori KK Posušje danas su započeli nastup na međunarodnom košarkaškom turniru u Sarajevu (Ilidža), koji se održava od 3. do 5. siječnja 2026. Turnir je započeo danas, a naši juniori su u prvoj utakmici svladali ekipu Šentvid (Slovenija) rezultatom 48:43. 🏆\n\nVrijedi istaknuti kako se ovaj turnir igra u isto vrijeme dok se selekcije U14 i U16 KK Posušje nalaze u Njemačkoj na internacionalnom Alba Berlin Winterturniru, što predstavlja veliki pothvat za KK Posušje na koji smo svi ponosni. 💪\n\nNaši juniori nalaze se u skupini s ekipama:\n\n• Borec Basket Veles (Sjeverna Makedonija)\n• BC Invaders (Albanija)\n• Fast Academy Spor Okolu (Bugarska)\n\n📅 Raspored utakmica:\n⏰ Danas u 19:30 protiv BC Invaders\n⏰ Sutra u 14:50 protiv Borec Basket Veles\n⏰ Sutra u 19:30 – posljednja utakmica grupne faze\n\nU skladu s dobrom suradnjom s HKK Mostar, za ekipu Posušja nastupaju i Robert Grizelj, Ivano Vidić i Ante Raspudić. Momčad vodi Ivo Begić, uz pomoć trenera Borne Peljkovića. 🤝\n\nSretno dalje našim juniorima! 🟡💪\n\n#kkposusje #ajmozuti", date: "03. 01. 2026.", category: "utakmica", image: junioriSarajevo, cardImage: cardJunioriSarajevo },
  { id: 29, title: "Vokel zlatni sponzor našeg kluba! 🤝", excerpt: "S velikim ponosom objavljujemo da je Vokel postao zlatni sponzor našeg kluba!", content: "Vokel zlatni sponzor našeg kluba! 🤝✨\n\nS velikim ponosom objavljujemo da je Vokel postao ZLATNI SPONZOR našeg kluba! 🏆\n\nOva suradnja predstavlja snažan iskorak i veliku podršku razvoju sporta, mladih talenata i ambicija našeg kluba. Povjerenje koje nam je Vokel ukazao daje nam dodatni vjetar u leđa na putu prema novim pobjedama i uspjesima. 💪\n\nHvala Vokelu što je prepoznao našu viziju, trud i strast prema košarci. Radujemo se zajedničkim projektima, dugoročnoj suradnji i stvaranju zlatnih trenutaka – zajedno! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti #vokel #zlatnisponzor #zajednojači", date: "18. 12. 2025.", category: "klub", image: sponzorVokel },
  { id: 30, title: "Sponzorska suradnja s Mrvelji! 🤝", excerpt: "S ponosom objavljujemo da je tvrtka Mrvelji postala brončani sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS ponosom objavljujemo da je tvrtka Mrvelji postala brončani sponzor našeg kluba. 🏆\n\nZahvaljujemo na ukazanom povjerenju i podršci razvoju sporta u našem kraju. 💪\n\nRadujemo se zajedničkim projektima i budućim uspjesima! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti #mrvelji", date: "15. 12. 2025.", category: "klub", image: sponzorMrvelji },
  { id: 31, title: "Poraz Posušja u Ljubuškom! 🏀", excerpt: "Košarkaši Posušja nakon infarktne završnice poraženi su od Ljubuškog rezultatom 85:81 u vjerojatno najboljoj utakmici sezone.", content: "Poraz Posušja u Ljubuškom! 🏀\n\nKošarkaši Posušja nakon infarktne završnice poraženi su od Ljubuškog, trenutno vodeće momčadi Prvenstva, rezultatom 85:81, u vjerovatno najboljoj utakmici dosadašnjeg dijela sezone.\n\nU redovima Posušja posebno se istakao Ante Kovač, koji je odigrao utakmicu života i postigao čak 36 poena. Nakon slabijeg prvog poluvremena, Kovač je u trećoj četvrtini sam ubacio 19 poena i vratio našu ekipu u potpunosti u utakmicu. Nažalost, u samoj završnici nedostajalo je malo sportske sreće za veliku pobjedu.\n\nAjmo žuti! 🟡💪\n\n#ajmozuti #kkposusje #kshercegbosne #ljubuski", date: "14. 12. 2025.", category: "utakmica", image: newsPorazLjubuski, cardImage: newsPorazLjubuskiCard, cardImagePosition: "center" },
  { id: 24, title: "Danas igra Posušje! 📢", excerpt: "Žuti večeras od 19 sati protiv Ljubuškog u SD Ljubuški! 📺 Prijenos na YouTube kanalu Sport Hercegovina!", content: "Danas igra Posušje! 🏀📢\n\nŽuti večeras od 19 sati protiv Ljubuškog! ⏰\n\n📍 SD Ljubuški\n📺 Prijenos utakmice na YouTube kanalu Sport Hercegovina\n\nAjmo Žuti! 💪🟡\n\n#ajmozuti #kkposusje #kshercegbosne #ljubuski", date: "14. 12. 2025.", category: "najava", image: najavaLjubuskiGameday, cardImage: cardNajavaLjubuskiGameday, cardImagePosition: "lower" },
  { id: 32, title: "Službena oprema – Božićno darivanje HKK Posušje! 🎄", excerpt: "Naruči svoj ili pokloni dragoj osobi pravi klupski Božićni dar! Košarkaški klub Posušje pripremio je nagradnu igru i naručivanje službene opreme!", content: "🎄 SLUŽBENA OPREMA – BOŽIĆNO DARIVANJE KK POSUŠJE 🎄\n\nNaruči svoj ili pokloni dragoj osobi pravi klupski Božićni dar. 🎁👏\n\nKošarkaški klub Posušje pripremio je nagradnu igru i omogućio je svim članovima i navijačima naručivanje službene opreme za sezonu 2025./26., savršene kao Božićni poklon za sebe ili dragu osobu. 🎁👏\n\nNaručivanje je moguće putem sljedećeg linka:\n👉 https://forms.gle/N55CEmVoZzZvXGmz5\n\nPripremili smo i Božićno darivanje u kojem darujemo:\n1. Službenu Trenerku KK Posušje, sezona 2025/26 (komplet),\n2. Duks KK Posušje, sezona 2025/26\n3. Majica kratkih rukava KK Posušje, sezona 2025/26\n\n*Nagradna igra vrijedi samo za instagram\n\nZa sudjelovanje je potrebno:\n1. Zapratiti stranicu KK Posušje i stranicu @josipvranjkovic.studio,\n2. Lajkati objavu i u komentaru označiti dvije osobe (moguće je sudjelovati više puta uz označavanje novih osoba).\n3. Za povećanje šanse u nagradnoj igri možete podijeliti objavu na svoj story (nije obavezno).\n\n📸 Veliko hvala Josipu Vranjkoviću na vrhunskim fotografijama! @josipvranjkovic.studio\n\nDobitnike izvlačimo 24. prosinca, dok narudžbe službene opreme primamo do 20.12. (subota).\n\nSretno svima! 🎄 🤍💛\n\n#kkposusje #ajmozuti", date: "12. 12. 2025.", category: "klub", image: xmasHero, cardImage: xmasCard, galleryImages: [xmas1, xmas2, xmas3, xmas4, xmas5, xmas6, xmas7, xmas8] },
  { id: 25, title: "Sponzorska suradnja sa Lagunom! 🤝", excerpt: "Košarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva KS Herceg-Bosne protiv ekipe Ljubuškog!", content: "Žuti u nedjelju protiv Ljubuškog! 🏀📢\n\nKošarkaši Posušja u nedjelju igraju 7. utakmicu Prvenstva Košarkaškog saveza Herceg-Bosne protiv ekipe Ljubuškog! 🔥\n\nŽuti do sada u odigranih 6 kola imaju 3 pobjede i 3 poraza, dok ekipa Ljubuškog ima 5 pobjeda i 1 poraz. 📊\n\n📍 SD Ljubuški\n⏰ 19h\n📺 YouTube: SportHercegovina\n\nAjmo žuti! 🟡💪\n\n#kkposusje #kkljubuski #kshercegbosne #ajmozuti", date: "11. 12. 2025.", category: "najava", image: najavaLjubuski, cardImage: cardNajavaLjubuski, cardImagePosition: "center" },
  { id: 33, title: "Žuti sutra protiv Širokog na Pecari! 📢", excerpt: "S velikim ponosom objavljujemo da je Miviko novi srebreni sponzor našeg kluba!", content: "Sponzorska suradnja! 🤝✨\n\nS velikim ponosom objavljujemo da je Miviko postao novi srebreni sponzor našeg kluba! 🏆\n\nHvala na ukazanom povjerenju, podršci i prepoznavanju važnosti sporta u našoj zajednici. 💪\n\nVeselimo se zajedničkim projektima, napretku i svim budućim uspjesima koje ćemo ostvariti zajedno! 🤝\n\nAjmo žuti! 🟡💪\n\n#kkposusje #ajmozuti #miviko", date: "06. 12. 2025.", category: "klub", image: sponzorMiviko },
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
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary mb-4">{article.title}{article.flagImage && <img src={article.flagImage} alt="flag" className="inline-block w-8 h-5 md:w-10 md:h-6 ml-2 align-middle" />}</h1>
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
                    <span key={j}>{line}{i === 0 && j === 0 && article.flagImage && <img src={article.flagImage} alt="flag" className="inline-block w-6 h-4 ml-1.5 align-middle" />}{j < arr.length - 1 && <br />}</span>
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
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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

          <div className="flex justify-center gap-1 md:gap-2 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center gap-1.5 px-3 md:px-5 py-2 md:py-3 rounded-full text-xs md:text-base font-medium transition-all duration-300 ${activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-foreground hover:bg-secondary hover:text-primary"}`}>
                  <IconComponent size={16} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
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
                    <h3 className="text-xl font-display text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}{item.flagImage && <img src={item.flagImage} alt="flag" className="inline-block w-5 h-3 ml-1.5 align-middle" />}</h3>
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
