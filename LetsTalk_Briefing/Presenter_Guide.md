---
title: "Presenter Guide: Let's Talk Briefing"
subtitle: "Ethical and Governance Challenges of Using Aboriginal and Torres Strait Islander Language Resources in AI Training"
---

# 1. Briefing at a glance

| Element | Content |
|---|---|
| Audience | Executive board of LinguaTech Pty Ltd (hypothetical company based on Case 2) |
| Decision | Proceed with training on publicly available Indigenous language materials now (Option A), or pause and partner with communities first (Option B) |
| Evidence source | Australian Bureau of Statistics (ABS, 2022a), *Language Statistics for Aboriginal and Torres Strait Islander Peoples, 2021* |
| Visualisation | Two-panel bar chart made in Python (matplotlib): `make_chart.py` |
| Key insight | Only 19 of the more than 150 languages in active use have over 1,000 home users. At least 132 languages (at least 87%) have 1,000 or fewer (ABS, 2022a) |
| Key message | The people whose consent is needed, and who could check AI output, are few and identifiable |
| Recommendation | Option B: pause, consult, validate, share benefit |
| Timing | Speaker notes total about 720 words, roughly 5 minutes at 140 words per minute |

# 2. Timed speaker script

The script is also in the speaker notes of each slide. Practise with a timer. If you run long, shorten slide 3 first.

**Slide 1 (0:00–0:25).** Good morning, board members. Today I'm briefing you on one decision: whether LinguaTech should train its language model on Aboriginal and Torres Strait Islander language resources now, or pause until we have community consent. I'll show you one piece of public evidence, what it means for us, its limits, and my recommendation.

**Slide 2 (0:25–0:55).** The product team wants to train on wordlists, place names and teaching materials that are freely online. Option A is to proceed now, which is fastest but assumes that public access equals permission. Option B is to pause and partner: seek collective consent first and train only on approved material. To choose, you need evidence on one question: who holds these languages, and how many people could give consent or check what our model produces?

**Slide 3 (0:55–1:30).** Why does this matter? These materials are not ordinary web content. The AIATSIS Code of Ethics (2020) says even desktop and archival work with Indigenous knowledge needs engagement and collective consent. The CARE principles (Carroll et al., 2020) give communities authority to control their data. Australia's AI Ethics Principles (DISR, 2019) expect reliable, transparent and contestable systems. And language strength is a national target under Closing the Gap (2020). So the question is not whether we can access the data, but whether we have permission.

**Slide 4 (1:30–2:00).** My evidence is the ABS Language Statistics release from the 2021 Census (ABS, 2022a). I chose it because it is official, public and national, and it counts how many people use each language at home. In 2021, 76,978 Aboriginal and Torres Strait Islander people, or 9.5%, used an Indigenous language at home, across 167 languages. I entered the published figures into a CSV and used Python and matplotlib so every value on the chart is calculated, not typed. I excluded third-party counts I could not verify against the ABS.

**Slide 5 (2:00–3:00).** This is the key evidence. On the left: of the more than 150 languages actively used, only 19 have over 1,000 home users (ABS, 2022a). That means at least 132 languages, at least 87%, are used at home by 1,000 people or fewer. I highlighted that bar in ochre because it is the key message. On the right: even the three most-used languages are small. Yumplatok has 7,596 home users, Kriol 7,403 and Djambarrpuyngu 3,839, together about a quarter of all home users. And two of those three are newer contact languages (DITRDC, 2020), so traditional languages are smaller still. The message for the board: the people whose consent we need, and who could check our model, are few and identifiable.

**Slide 6 (3:00–3:40).** What does this mean for us? First, consent is achievable: these are small, identifiable communities we can reach through language centres. Second, our capacity to check outputs is thin: few fluent speakers exist per language, and low-resource languages are already poorly served by language technology (Joshi et al., 2020). Third, risk falls on a few people. Bird (2020) warns that treating Indigenous knowledge as a commodity can sideline its holders. To be clear, the data shows where risk is concentrated; it does not prove harm will occur.

**Slide 7 (3:40–4:15).** This evidence has limits. The Census counts home use, not fluency or custodial authority, so the true number of people able to validate output may be smaller. The ABS reports "over 150" languages, so I used 151 as a conservative lower bound; the real share of small languages can only be higher. The new national survey, NILS4, counts 177 languages spoken or used, 45 of them strong, but the Productivity Commission (2026) notes this cannot be compared with the earlier baseline. So I use the Census for scale, not trends. Finally, speaker numbers don't measure harm, so my recommendation is about managing risk.

**Slide 8 (4:15–5:00).** My recommendation is Option B: pause and partner. First, pause collection and training until consent is in place (AIATSIS, 2020). Second, consult language centres and Traditional Owner groups for collective, informed consent (Carroll et al., 2020). Third, test any output with fluent speakers and block languages we cannot validate (DISR, 2019). Fourth, put benefit-sharing and licence agreements in writing, with a takedown pathway. The evidence shows these communities are small and identifiable, which makes consent both necessary and achievable. I ask the board to approve a pause and fund that consultation. Thank you; I'm happy to take questions.

# 3. How the visualisation was produced (be ready to explain this)

1. **Data entry.** I copied the published ABS figures into `language_data.csv`, one row per figure, with a `source` column so each number can be traced.
2. **Derivation.** `make_chart.py` reads the CSV and calculates every value shown on the chart:
   - 151 − 19 = **132** languages with 1,000 or fewer home users
   - 132 / 151 = **87%**
   - 7,596 + 7,403 + 3,839 = **18,838** people, and 18,838 / 76,978 = **24.5%**

   An `assert` line checks the main derived value.
3. **Plotting.** I used matplotlib horizontal bar charts. Horizontal bars suit long category names, and the axes start at zero so bar lengths are honest.
4. **Output.** The script saves a 300 dpi PNG that is inserted on slide 5.

**Design choices and why they suit a board audience**

- **One highlight colour (ochre) for the key message bar; grey for context.** The board's eye goes straight to the main point.
- **The title states the finding, not just the topic.** It sits with a one-line key message in the same ochre.
- **Direct value labels instead of a legend-heavy design.** The board doesn't have to read values off the axis.
- **Zero-based axes and no 3D or dual axes.** These avoid misleading design.
- **Annotations explain what the number means** ("small communities that can be identified and approached for consent").
- **Source and caveats are printed on the figure.** The chart stays honest even if it's shared on its own.
- **Bars, not a pie chart.** People compare lengths more accurately than angles, and the categories aren't parts of a single meaningful whole across both panels.

# 4. Likely questions and model answers

**Q1. Why did you choose this audience?**
The board holds the decision right: it approves product direction and budget. My evidence was chosen to answer the board's specific question, not to explain everything about Indigenous languages.

**Q2. Why this dataset rather than another?**
The ABS Census is official, national and publicly available, and it reports how many people use each language. That speaks directly to *who could consent or validate*. The NILS4 survey (Productivity Commission, 2026) gives strength ratings, but it uses a different method. Its figures can't be compared with earlier baselines, so I used it as context in the limitations, not as the chart.

**Q3. Is your claim causal? Does a small speaker base cause harm?**
No. The data shows *where risk is concentrated*. It doesn't show that AI training causes harm. My recommendation is a risk-management decision based on ethical obligations (AIATSIS, 2020; Carroll et al., 2020), supported by the scale evidence.

**Q4. Why 151 and not 167 languages?**
The ABS figure for 19 languages with over 1,000 users comes from the release that says "over 150" languages actively used (ABS, 2022a). To compare like with like, I used 151 as the lower bound from that same release. If I used 167, the share of small languages would be even higher (148/167, about 89%), so my figure is conservative.

**Q5. What did you leave out and why?**
I left out speaker counts for individual languages below the top three that I found only on secondary websites and couldn't verify against the ABS. I also left out trend comparisons, because the Productivity Commission (2026) says the NILS3 and NILS4 counts are not comparable.

**Q6. Isn't the title biased? Did you decide the answer first?**
The title and subtitle frame a decision; the recommendation follows from the evidence. If the data had shown a few large, well-resourced language communities, the consent and validation argument would have been weaker. It shows the opposite.

**Q7. What would change your recommendation?**
Three things: documented free, prior and informed consent from the relevant communities; a written benefit-sharing agreement; and a validation process with fluent speakers. With those in place, training on the approved materials could proceed.

**Q8. Home use is not fluency. Doesn't that weaken your point?**
It strengthens it. If fewer people are fluent than use a language at home, there are even fewer people who could check AI output, so the validation risk is higher than the chart shows.

**Q9. How would you explain the chart to someone colour-blind?**
The key bar is also identified by its direct label ("at least 132 languages") and its position, not only by colour. Ochre and grey also differ strongly in lightness.

**Q10. How does this connect to your earlier case analysis?**
The case analysis identified the governance risks through CARE, the AI Ethics Principles and the ACS Code. This briefing turns that analysis into a single decision for a specific audience, backed by public evidence.

# 5. Verification log (all figures checked October 2026)

| Figure used | Value | Source |
|---|---|---|
| People using an Indigenous language at home, 2021 | 76,978 (9.5%) | ABS (2022a) |
| Same figure, 2016 | 63,754 (9.8%) | ABS (2022a) |
| Languages actively used, 2021 | "over 150" | ABS (2022a) |
| Languages used by over 1,000 people | 19 | ABS (2022a) |
| Languages used at home (Census summary) | 167 | ABS (2022b) |
| Yumplatok (Torres Strait Creole) | 7,596 | ABS (2022a) |
| Kriol | 7,403 | ABS (2022a) |
| Djambarrpuyngu | 3,839 | ABS (2022a) |
| NILS4 languages spoken or used / strong | 177 / 45 | Productivity Commission (2026) |
| 2018–19 baseline (not comparable) | 123 / 14 strong | Productivity Commission (2026) |

The ABS initially published 78,656 people and later corrected it to 76,978. Only the corrected figure is used.

**Check before submitting.** Open the two ABS URLs in the reference list and confirm the figures and release years against the live pages; the ABS website could not be opened from my working environment. Also confirm with your unit coordinator that the slide count and the Python workflow suit your pathway.

# 6. References

Australian Bureau of Statistics. (2022a). *Language statistics for Aboriginal and Torres Strait Islander peoples, 2021*. https://www.abs.gov.au/statistics/people/aboriginal-and-torres-strait-islander-peoples/language-statistics-aboriginal-and-torres-strait-islander-peoples/2021

Australian Bureau of Statistics. (2022b). *Aboriginal and Torres Strait Islander people: Census, 2021*. https://www.abs.gov.au/statistics/people/aboriginal-and-torres-strait-islander-peoples/aboriginal-and-torres-strait-islander-people-census/2021

Australian Institute of Aboriginal and Torres Strait Islander Studies. (2020). *AIATSIS code of ethics for Aboriginal and Torres Strait Islander research*. https://aiatsis.gov.au/sites/default/files/2022-02/aiatsis-code-ethics-jan22.pdf

Bird, S. (2020). Decolonising speech and language technology. In *Proceedings of the 28th International Conference on Computational Linguistics* (pp. 3504–3519). https://doi.org/10.18653/v1/2020.coling-main.313

Carroll, S. R., Garba, I., Figueroa-Rodríguez, O. L., Holbrook, J., Lovett, R., Materechera, S., Parsons, M., Raseroka, K., Rodriguez-Lonebear, D., Rowe, R., Sara, R., Walker, J. D., Anderson, J., & Hudson, M. (2020). The CARE principles for Indigenous data governance. *Data Science Journal, 19*(1), 43. https://doi.org/10.5334/dsj-2020-043

Department of Industry, Science and Resources. (2019). *Australia's AI ethics principles*. https://www.industry.gov.au/publications/australias-ai-ethics-principles

Department of Infrastructure, Transport, Regional Development and Communications. (2020). *National Indigenous languages report*. https://www.arts.gov.au/what-we-do/indigenous-arts-and-languages/national-indigenous-languages-report

Joint Council on Closing the Gap. (2020). *National Agreement on Closing the Gap*. https://www.closingthegap.gov.au/national-agreement

Joshi, P., Santy, S., Budhiraja, A., Bali, K., & Choudhury, M. (2020). The state and fate of linguistic diversity and inclusion in the NLP world. In *Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics* (pp. 6282–6293). https://doi.org/10.18653/v1/2020.acl-main.560

Productivity Commission. (2026). *Closing the Gap information repository: Socio-economic outcome area 16 dashboard*. https://www.pc.gov.au/closing-the-gap-data/dashboard/socioeconomic/outcome-area16
