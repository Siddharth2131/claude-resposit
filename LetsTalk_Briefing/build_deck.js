// Builds Consent_Before_Code_Briefing.pptx (run: node build_deck.js)
const pptxgen = require("pptxgenjs");
// Optional: writes theme colours into the file (only available in the build environment)
let applyTheme = async () => {};
try { ({ applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js")); } catch (e) {}

const THEME = {
  name: "Ochre Briefing",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "2B2B2B", lt1: "FFFFFF", dk2: "2F2420", lt2: "F2EFEC",
    accent1: "B5532A", accent2: "5E7454", accent3: "B9B4AE",
    accent4: "8A6A4F", accent5: "3F5E6E", accent6: "D9A441",
    hlink: "3F5E6E", folHlink: "8A6A4F",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625 in
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = "Ethical and Governance Challenges of Using Aboriginal and Torres Strait Islander Language Resources in AI Training";
pres.author = "[Student Name]";
const C = pres.SchemeColor;

const FOOT = "Hypothetical company scenario based on Case 2 · All data: publicly available sources (see References)";

// ---------------------------------------------------------------- layouts
pres.defineSlideMaster({
  title: "DARK",
  background: { color: C.text2 },
  objects: [],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: C.background1 },
  objects: [
    { text: { text: FOOT, options: { x: 0.5, y: 5.28, w: 7.6, h: 0.25, fontSize: 9, color: C.accent3, margin: 0 } } },
  ],
  slideNumber: { x: 9.1, y: 5.28, w: 0.4, h: 0.25, fontSize: 9, color: C.accent3, align: "right" },
});

function title(slide, text, sub) {
  slide.addText(text, { x: 0.5, y: 0.3, w: 9, h: 0.6, fontFace: THEME.headFontFace, fontSize: 26, bold: true, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
  if (sub) slide.addText(sub, { x: 0.5, y: 0.9, w: 9, h: 0.35, fontSize: 14, italic: true, color: C.accent1, margin: 0, isTextBox: true });
}
function circle(slide, x, y, label, fill) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: 0.42, h: 0.42, fill: { color: fill || C.accent1 }, line: { color: fill || C.accent1 } });
  slide.addText(label, { x, y, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
}
function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || C.background2 }, line: { color: fill || C.background2 } });
}
const cite = (t) => ({ text: t, options: { fontSize: 11, color: "6B6B6B", italic: true } });

// ================================================================ slide 1
let s = pres.addSlide({ masterName: "DARK" });
s.addText("Ethical and Governance Challenges of Using Aboriginal and Torres Strait Islander Language Resources in AI Training", {
  x: 0.6, y: 0.75, w: 8.8, h: 1.7, fontFace: THEME.headFontFace, fontSize: 30, bold: true, color: C.background1, margin: 0, isTextBox: true, valign: "top",
});
s.addText("A briefing to the LinguaTech Pty Ltd executive board: should we proceed with training now, or pause for community consent?", {
  x: 0.6, y: 2.55, w: 8.4, h: 0.8, fontSize: 17, italic: true, color: THEME.colors.accent6, margin: 0, isTextBox: true,
});
s.addText([
  { text: "Audience: ", options: { bold: true } }, { text: "Executive board (decision-makers on product and data strategy)", options: { breakLine: true } },
  { text: "Decision: ", options: { bold: true } }, { text: "Proceed with model training now, or pause and partner with communities", options: { breakLine: true } },
  { text: "Presenter: [Student Name] · [Student ID] · Edith Cowan University · 2026" },
], { x: 0.6, y: 3.5, w: 8.8, h: 1.0, fontSize: 13, color: C.background1, margin: 0, isTextBox: true, paraSpaceAfter: 4 });
s.addText("LinguaTech Pty Ltd is a hypothetical company used to present the Case 2 scenario; it does not represent any real organisation.", {
  x: 0.6, y: 4.9, w: 8.8, h: 0.35, fontSize: 10, italic: true, color: C.accent3, margin: 0, isTextBox: true,
});
s.addNotes(`[0:00–0:25] Good morning, board members. Today I'm briefing you on one decision: whether LinguaTech should train its language model on Aboriginal and Torres Strait Islander language resources now, or pause until we have community consent. I'll show you one piece of public evidence, what it means for us, its limits, and my recommendation.`);

// ================================================================ slide 2
s = pres.addSlide({ masterName: "CONTENT" });
title(s, "The decision before the board", "Our product team proposes training on language materials that are freely available online");
card(s, 0.5, 1.45, 4.35, 2.55);
circle(s, 0.7, 1.62, "A", C.accent3);
s.addText("Proceed now", { x: 1.25, y: 1.62, w: 3.4, h: 0.42, fontSize: 18, bold: true, color: C.text1, valign: "middle", margin: 0, isTextBox: true });
s.addText([
  { text: "Scrape public wordlists, place names and teaching materials", options: { bullet: true, breakLine: true } },
  { text: "Fastest route to market", options: { bullet: true, breakLine: true } },
  { text: "Assumes public access equals permission to use", options: { bullet: true } },
], { x: 0.7, y: 2.2, w: 4.0, h: 1.6, fontSize: 14, color: C.text1, margin: 0, isTextBox: true, paraSpaceAfter: 6, valign: "top" });

card(s, 5.15, 1.45, 4.35, 2.55);
circle(s, 5.35, 1.62, "B");
s.addText("Pause and partner", { x: 5.9, y: 1.62, w: 3.4, h: 0.42, fontSize: 18, bold: true, color: C.accent1, valign: "middle", margin: 0, isTextBox: true });
s.addText([
  { text: "Seek collective, informed consent from language communities first", options: { bullet: true, breakLine: true } },
  { text: "Train only on approved materials", options: { bullet: true, breakLine: true } },
  { text: "Slower start, lower legal, ethical and reputational risk", options: { bullet: true } },
], { x: 5.35, y: 2.2, w: 4.0, h: 1.6, fontSize: 14, color: C.text1, margin: 0, isTextBox: true, paraSpaceAfter: 6, valign: "top" });

s.addText([
  { text: "What the board needs from this briefing: ", options: { bold: true } },
  { text: "evidence on who holds these languages and how many people could give consent or check AI output." },
], { x: 0.5, y: 4.2, w: 9, h: 0.75, fontSize: 14, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
s.addNotes(`[0:25–0:55] The product team wants to train on wordlists, place names and teaching materials that are freely online. Option A is to proceed now, which is fastest but assumes that public access equals permission. Option B is to pause and partner: seek collective consent first and train only on approved material. To choose, you need evidence on one question: who holds these languages, and how many people could give consent or check what our model produces?`);

// ================================================================ slide 3
s = pres.addSlide({ masterName: "CONTENT" });
title(s, "Why “publicly available” is not the same as “permitted”", "Language data is collectively owned cultural knowledge, not ordinary web content");
const rows3 = [
  ["1", "Collective ownership and consent", [
    { text: "Research using Indigenous knowledge, including desktop and archival sources, needs community engagement and collective consent; ICIP must be protected by agreement " }, cite("(AIATSIS, 2020)")]],
  ["2", "Authority to control", [
    { text: "The CARE principles give Indigenous peoples authority over how their data is used and require collective benefit " }, cite("(Carroll et al., 2020)")]],
  ["3", "Responsible AI duties", [
    { text: "Australia's AI Ethics Principles expect reliability, transparency and contestability from AI systems " }, cite("(Department of Industry, Science and Resources [DISR], 2019)")]],
  ["4", "A national policy priority", [
    { text: "Target 16 seeks a sustained increase in the number and strength of languages spoken by 2031 " }, cite("(Joint Council on Closing the Gap, 2020)")]],
];
rows3.forEach(([n, head, body], i) => {
  const y = 1.45 + i * 0.93;
  circle(s, 0.5, y + 0.05, n);
  s.addText(head, { x: 1.1, y, w: 8.4, h: 0.3, fontSize: 15, bold: true, color: C.text1, margin: 0, isTextBox: true });
  s.addText(body, { x: 1.1, y: y + 0.32, w: 8.4, h: 0.55, fontSize: 13, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
});
s.addNotes(`[0:55–1:30] Why does this matter? These materials are not ordinary web content. The AIATSIS Code of Ethics (2020) says even desktop and archival work with Indigenous knowledge needs engagement and collective consent. The CARE principles (Carroll et al., 2020) give communities authority to control their data. Australia's AI Ethics Principles (DISR, 2019) expect reliable, transparent and contestable systems. And language strength is a national target under Closing the Gap (2020). So the question is not whether we can access the data, but whether we have permission.`);

// ================================================================ slide 4
s = pres.addSlide({ masterName: "CONTENT" });
title(s, "Evidence source and method", "Why this dataset, how it was analysed, and what was left out");
card(s, 0.5, 1.45, 4.3, 3.6);
s.addText([
  { text: "Source", options: { bold: true, fontSize: 15, color: THEME.colors.accent1, breakLine: true } },
  { text: "Australian Bureau of Statistics (ABS, 2022a), Language Statistics for Aboriginal and Torres Strait Islander Peoples, 2021 (2021 Census)", options: { breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "Why chosen", options: { bold: true, fontSize: 15, color: THEME.colors.accent1, breakLine: true } },
  { text: "Official, public and national; counts people using each language at home, which shows how many people hold each language", options: { breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "Headline figures", options: { bold: true, fontSize: 15, color: THEME.colors.accent1, breakLine: true } },
  { text: "76,978 people (9.5%) used an Indigenous language at home; 167 languages were reported (ABS, 2022a, 2022b). Two of the three largest, Yumplatok and Kriol, are newer contact languages (Department of Infrastructure, Transport, Regional Development and Communications [DITRDC], 2020)" },
], { x: 0.7, y: 1.6, w: 3.9, h: 3.35, fontSize: 12, color: C.text1, margin: 0, isTextBox: true, valign: "top" });

const steps = [
  ["1", "Extract", "Published ABS figures entered into a CSV with a source column"],
  ["2", "Analyse", "Python derives every chart value (e.g. 151 − 19 = 132 small languages)"],
  ["3", "Visualise", "matplotlib bar charts; one highlight colour for the key message"],
  ["4", "Exclude", "Language counts from secondary websites that could not be checked against the ABS"],
];
steps.forEach(([n, h, b], i) => {
  const y = 1.45 + i * 0.9;
  circle(s, 5.1, y + 0.03, n, C.accent2);
  s.addText(h, { x: 5.65, y, w: 3.85, h: 0.3, fontSize: 15, bold: true, color: C.text1, margin: 0, isTextBox: true });
  s.addText(b, { x: 5.65, y: y + 0.3, w: 3.85, h: 0.55, fontSize: 12.5, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
});
s.addNotes(`[1:30–2:00] My evidence is the ABS Language Statistics release from the 2021 Census (ABS, 2022a). I chose it because it is official, public and national, and it counts how many people use each language at home. In 2021, 76,978 Aboriginal and Torres Strait Islander people, or 9.5%, used an Indigenous language at home, across 167 languages. I entered the published figures into a CSV and used Python and matplotlib so every value on the chart is calculated, not typed. I excluded third-party counts I could not verify against the ABS.`);

// ================================================================ slide 5 (chart)
s = pres.addSlide({ masterName: "CONTENT" });
s.addText("The evidence: ABS 2021 Census language data", { x: 0.5, y: 0.25, w: 9, h: 0.5, fontFace: THEME.headFontFace, fontSize: 24, bold: true, color: C.text1, margin: 0, isTextBox: true });
s.addImage({ path: "figure_language_concentration.png", x: 0.55, y: 0.85, w: 8.9, h: 8.9 * 1560 / 3150, altText: "Two bar charts. Left: 19 languages have more than 1,000 home users; at least 132 have 1,000 or fewer. Right: Yumplatok 7,596, Kriol 7,403, Djambarrpuyngu 3,839 home users, together 24.5% of 76,978. Source ABS 2022." });
s.addNotes(`[2:00–3:00] This is the key evidence. On the left: of the more than 150 languages actively used, only 19 have over 1,000 home users (ABS, 2022a). That means at least 132 languages, at least 87%, are used at home by 1,000 people or fewer. I highlighted that bar in ochre because it is the key message. On the right: even the three most-used languages are small. Yumplatok has 7,596 home users, Kriol 7,403 and Djambarrpuyngu 3,839, together about a quarter of all home users. And two of those three are newer contact languages (Department of Infrastructure, Transport, Regional Development and Communications [DITRDC], 2020), so traditional languages are smaller still. The message for the board: the people whose consent we need, and who could check our model, are few and identifiable.`);

// ================================================================ slide 6
s = pres.addSlide({ masterName: "CONTENT" });
title(s, "What this means for LinguaTech", "Interpreting the evidence for our decision");
const cards6 = [
  ["Consent is achievable", [
    { text: "Small, identifiable communities can be reached through language centres. Seeking consent is practical, not impossible." }]],
  ["Output checking is thin", [
    { text: "With 1,000 or fewer home users per language, few fluent speakers exist to catch errors. Low-resource languages are already poorly served by NLP " }, cite("(Joshi et al., 2020)")]],
  ["Risk falls on few people", [
    { text: "Errors or misuse affect small groups directly. Treating Indigenous knowledge as a commodity can sideline its holders " }, cite("(Bird, 2020)")]],
];
cards6.forEach(([h, b], i) => {
  const x = 0.5 + i * 3.08;
  card(s, x, 1.45, 2.85, 3.0);
  circle(s, x + 0.2, 1.62, String(i + 1));
  s.addText(h, { x: x + 0.2, y: 2.15, w: 2.45, h: 0.6, fontSize: 16, bold: true, color: C.accent1, margin: 0, isTextBox: true, valign: "top" });
  s.addText(b, { x: x + 0.2, y: 2.8, w: 2.45, h: 1.55, fontSize: 12.5, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
});
s.addText("The data shows where risk is concentrated; it does not by itself prove harm will occur.", { x: 0.5, y: 4.6, w: 9, h: 0.4, fontSize: 13, italic: true, color: C.text1, margin: 0, isTextBox: true });
s.addNotes(`[3:00–3:40] What does this mean for us? First, consent is achievable: these are small, identifiable communities we can reach through language centres. Second, our capacity to check outputs is thin: few fluent speakers exist per language, and low-resource languages are already poorly served by language technology (Joshi et al., 2020). Third, risk falls on a few people. Bird (2020) warns that treating Indigenous knowledge as a commodity can sideline its holders. To be clear, the data shows where risk is concentrated; it does not prove harm will occur.`);

// ================================================================ slide 7
s = pres.addSlide({ masterName: "CONTENT" });
title(s, "Limitations and uncertainty", "What the evidence cannot tell us, and how that affects the conclusion");
const lim = [
  ["Home use is not fluency", "Census counts people using a language at home; it does not measure fluency or custodial authority (ABS, 2022a)", "Validators may be fewer than shown"],
  ["Self-reported and lower-bound figures", "ABS reports 'over 150' languages; 151 is used as a lower bound, so the 132 figure is conservative", "Conclusion holds or strengthens"],
  ["Different surveys, different counts", "NILS4 reports 177 languages spoken or used, 45 strong; not comparable with the 2018–19 baseline (Productivity Commission, 2026)", "Use Census for scale, not trend"],
  ["No direct measure of harm", "Speaker numbers show where risk is concentrated, not that AI training causes harm", "Recommendation is risk-based"],
];
const hdr = (t) => ({ text: t, options: { bold: true, color: "FFFFFF", fill: { color: THEME.colors.dk2 }, fontSize: 13 } });
const tbl = [[hdr("Limitation"), hdr("Detail"), hdr("Effect on conclusion")]].concat(
  lim.map(r => [{ text: r[0], options: { bold: true } }, r[1], r[2]]));
s.addTable(tbl, { x: 0.5, y: 1.4, w: 9, colW: [2.2, 4.6, 2.2], fontSize: 12, color: THEME.colors.dk1, border: { type: "solid", pt: 0.75, color: "D9D4CF" }, valign: "middle", rowH: [0.38, 0.8, 0.8, 0.8, 0.6] });
s.addNotes(`[3:40–4:15] This evidence has limits. The Census counts home use, not fluency or custodial authority, so the true number of people able to validate output may be smaller. The ABS reports "over 150" languages, so I used 151 as a conservative lower bound; the real share of small languages can only be higher. The new national survey, NILS4, counts 177 languages spoken or used, 45 of them strong, but the Productivity Commission (2026) notes this cannot be compared with the earlier baseline. So I use the Census for scale, not trends. Finally, speaker numbers don't measure harm, so my recommendation is about managing risk.`);

// ================================================================ slide 8
s = pres.addSlide({ masterName: "DARK" });
s.addText("Recommendation: pause training and partner first", { x: 0.5, y: 0.3, w: 9, h: 0.6, fontFace: THEME.headFontFace, fontSize: 26, bold: true, color: C.background1, margin: 0, isTextBox: true });
s.addText("Option B. Because the communities are small and identifiable, consent is both necessary and achievable.", { x: 0.5, y: 0.92, w: 9, h: 0.4, fontSize: 14, italic: true, color: THEME.colors.accent6, margin: 0, isTextBox: true });
const recs = [
  ["Pause", "Stop collection and training on Indigenous language data until consent is in place", "(AIATSIS, 2020)"],
  ["Consult", "Seek free, prior and informed collective consent via language centres and Traditional Owner groups", "(Carroll et al., 2020)"],
  ["Validate", "Test any output with fluent community speakers; block unvalidated languages", "(DISR, 2019)"],
  ["Share benefit", "Written benefit-sharing and data-licence agreements, with a takedown pathway", "(Carroll et al., 2020)"],
];
recs.forEach(([h, b, c], i) => {
  const y = 1.5 + i * 0.85;
  circle(s, 0.5, y + 0.05, String(i + 1));
  s.addText([
    { text: h + ": ", options: { bold: true, color: THEME.colors.accent6 } },
    { text: b + " " },
    { text: c, options: { italic: true, color: THEME.colors.accent3 } },
  ], { x: 1.1, y, w: 8.4, h: 0.55, fontSize: 14, color: C.background1, margin: 0, isTextBox: true, valign: "middle" });
});
s.addText("Next step: board approval to pause training and fund a consultation with language centres before the next product review.", { x: 0.5, y: 4.85, w: 9, h: 0.4, fontSize: 13, bold: true, color: C.background1, margin: 0, isTextBox: true });
s.addNotes(`[4:15–5:00] My recommendation is Option B: pause and partner. First, pause collection and training until consent is in place (AIATSIS, 2020). Second, consult language centres and Traditional Owner groups for collective, informed consent (Carroll et al., 2020). Third, test any output with fluent speakers and block languages we cannot validate (DISR, 2019). Fourth, put benefit-sharing and licence agreements in writing, with a takedown pathway. The evidence shows these communities are small and identifiable, which makes consent both necessary and achievable. I ask the board to approve a pause and fund that consultation. Thank you; I'm happy to take questions.`);

// ================================================================ slide 9
s = pres.addSlide({ masterName: "CONTENT" });
title(s, "References");
const refs = [
  "Australian Bureau of Statistics. (2022a). Language statistics for Aboriginal and Torres Strait Islander peoples, 2021. https://www.abs.gov.au/statistics/people/aboriginal-and-torres-strait-islander-peoples/language-statistics-aboriginal-and-torres-strait-islander-peoples/2021",
  "Australian Bureau of Statistics. (2022b). Aboriginal and Torres Strait Islander people: Census, 2021. https://www.abs.gov.au/statistics/people/aboriginal-and-torres-strait-islander-peoples/aboriginal-and-torres-strait-islander-people-census/2021",
  "Australian Institute of Aboriginal and Torres Strait Islander Studies. (2020). AIATSIS code of ethics for Aboriginal and Torres Strait Islander research. https://aiatsis.gov.au/sites/default/files/2022-02/aiatsis-code-ethics-jan22.pdf",
  "Bird, S. (2020). Decolonising speech and language technology. In Proceedings of the 28th International Conference on Computational Linguistics (pp. 3504–3519). https://doi.org/10.18653/v1/2020.coling-main.313",
  "Carroll, S. R., Garba, I., Figueroa-Rodríguez, O. L., Holbrook, J., Lovett, R., Materechera, S., Parsons, M., Raseroka, K., Rodriguez-Lonebear, D., Rowe, R., Sara, R., Walker, J. D., Anderson, J., & Hudson, M. (2020). The CARE principles for Indigenous data governance. Data Science Journal, 19(1), 43. https://doi.org/10.5334/dsj-2020-043",
  "Department of Industry, Science and Resources. (2019). Australia's AI ethics principles. https://www.industry.gov.au/publications/australias-ai-ethics-principles",
  "Department of Infrastructure, Transport, Regional Development and Communications. (2020). National Indigenous languages report. https://www.arts.gov.au/what-we-do/indigenous-arts-and-languages/national-indigenous-languages-report",
  "Joint Council on Closing the Gap. (2020). National Agreement on Closing the Gap. https://www.closingthegap.gov.au/national-agreement",
  "Joshi, P., Santy, S., Budhiraja, A., Bali, K., & Choudhury, M. (2020). The state and fate of linguistic diversity and inclusion in the NLP world. In Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics (pp. 6282–6293). https://doi.org/10.18653/v1/2020.acl-main.560",
  "Productivity Commission. (2026). Closing the Gap information repository: Socio-economic outcome area 16 dashboard. https://www.pc.gov.au/closing-the-gap-data/dashboard/socioeconomic/outcome-area16",
];
s.addText(refs.map((r, i) => ({ text: r, options: { breakLine: i < refs.length - 1, indentLevel: 0 } })), {
  x: 0.5, y: 0.95, w: 9, h: 4.25, fontSize: 10, color: C.text1, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 3,
});
s.addNotes("Reference list (APA 7th). Shown, not spoken.");

(async () => {
  const out = "Consent_Before_Code_Briefing.pptx";
  await pres.writeFile({ fileName: out });
  await applyTheme(out, THEME);
  console.log("wrote", out);
})();
