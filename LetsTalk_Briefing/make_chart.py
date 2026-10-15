"""
Consent Before Code briefing - evidence visualisation
-----------------------------------------------------
Builds the annotated two-panel chart used on the evidence slide.

Data: Australian Bureau of Statistics (2022a). Language Statistics for
Aboriginal and Torres Strait Islander Peoples, 2021 (2021 Census).
Figures are entered in language_data.csv exactly as published by the ABS.

Run:  python make_chart.py
Out:  figure_language_concentration.png  (300 dpi, for the slide deck)
"""

import csv
import logging
from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import Patch

HERE = Path(__file__).parent
logging.getLogger("matplotlib.font_manager").setLevel(logging.ERROR)  # quiet font fallback

# ---------------------------------------------------------------- data ---
def load_data(path):
    """Read the measure/value pairs from the CSV into a dictionary."""
    with open(path, newline="", encoding="utf-8") as f:
        return {row["measure"]: float(row["value"]) for row in csv.DictReader(f)}

d = load_data(HERE / "language_data.csv")

total_speakers = d["people_using_indigenous_language_at_home_2021"]   # 76,978
languages_min = d["languages_actively_used_lower_bound"]              # 'over 150' -> 151
big_languages = d["languages_used_by_more_than_1000_people"]          # 19
small_languages = languages_min - big_languages                       # at least 132

top3 = {
    "Yumplatok\n(Torres Strait Creole)": d["speakers_Yumplatok_Torres_Strait_Creole"],
    "Kriol": d["speakers_Kriol"],
    "Djambarrpuyngu": d["speakers_Djambarrpuyngu"],
}
top3_total = sum(top3.values())
top3_share = top3_total / total_speakers * 100

# Simple checks so the numbers on the chart are always derived, never typed
assert small_languages >= 132
print(f"Languages with 1,000 or fewer home users: at least {small_languages:.0f}")
print(f"Share of languages with >1,000 users: at most {big_languages / languages_min:.1%}")
print(f"Top-3 languages: {top3_total:,.0f} people = {top3_share:.1f}% of {total_speakers:,.0f}")

# --------------------------------------------------------------- style ---
OCHRE = "#B5532A"     # highlight: the key message (many small languages)
MUTED = "#B9B4AE"     # context bars
INK = "#2B2B2B"       # text
SUBTLE = "#6B6B6B"    # secondary text

plt.rcParams.update({
    "font.family": ["Calibri", "Carlito", "Arial", "Liberation Sans", "DejaVu Sans"],
    "font.size": 12,
    "text.color": INK,
    "axes.labelcolor": SUBTLE,
    "xtick.color": SUBTLE,
    "ytick.color": INK,
    "axes.spines.top": False,
    "axes.spines.right": False,
})

fig, (ax1, ax2) = plt.subplots(
    1, 2, figsize=(10.5, 5.2), dpi=300,
    gridspec_kw={"width_ratios": [1.05, 1], "wspace": 0.62},
)

# ------------------------------------- Panel A: how many languages are small?
labels_a = ["More than 1,000\nhome users", "1,000 or fewer\nhome users"]
values_a = [big_languages, small_languages]
bars = ax1.barh(labels_a, values_a, color=[MUTED, OCHRE], height=0.55)
ax1.set_xlim(0, 175)
ax1.set_xlabel("Number of languages actively used (2021 Census)")
ax1.set_title("A. How many languages have a large speaker base?",
              loc="left", fontsize=13, fontweight="bold", pad=12)
ax1.text(big_languages + 3, 0, f"{big_languages:.0f} languages",
         va="center", fontsize=13, color=INK)
ax1.text(small_languages + 3, 1, f"at least\n{small_languages:.0f} languages",
         va="center", fontsize=13, fontweight="bold", color=OCHRE)
ax1.annotate(
    f"At least {small_languages / languages_min:.0%} of languages are used at home\n"
    "by 1,000 people or fewer: small communities\n"
    "that can be identified and approached for consent.",
    xy=(70, 1.28), xytext=(4, 2.05), fontsize=11.5, color=INK,
    arrowprops=dict(arrowstyle="-", color=SUBTLE, lw=1),
)
ax1.set_ylim(-0.6, 2.6)
ax1.grid(axis="x", color="#E6E3DF", lw=0.8)
ax1.set_axisbelow(True)

# ------------------------------- Panel B: even the largest languages are small
names = list(top3.keys())[::-1]
vals = list(top3.values())[::-1]
ax2.barh(names, vals, color=MUTED, height=0.55)
ax2.set_xlim(0, 10000)
ax2.set_xlabel("People using the language at home (2021 Census)")
ax2.set_title("B. The three most-used languages",
              loc="left", fontsize=13, fontweight="bold", pad=12)
for y, v in enumerate(vals):
    ax2.text(v + 120, y, f"{v:,.0f}", va="center", fontsize=13)
ax2.annotate(
    f"Together: {top3_total:,.0f} people,\n"
    f"{top3_share:.1f}% of all {total_speakers:,.0f} home users",
    xy=(7596, 2.28), xytext=(2600, 3.05), fontsize=11.5, color=INK,
    arrowprops=dict(arrowstyle="-", color=SUBTLE, lw=1),
)
ax2.set_ylim(-0.6, 3.6)
ax2.grid(axis="x", color="#E6E3DF", lw=0.8)
ax2.set_axisbelow(True)
ax2.xaxis.set_major_formatter(lambda x, _: f"{x:,.0f}")

# --------------------------------------------------- title, key message, source
fig.suptitle(
    "Most Aboriginal and Torres Strait Islander languages are used by small communities",
    x=0.02, ha="left", y=0.995, fontsize=15, fontweight="bold",
)
fig.text(0.02, 0.905,
         "Key message: the people whose consent is needed, and who could check AI output, "
         "are few and identifiable.",
         fontsize=12.5, color=OCHRE, fontweight="bold")
fig.legend(handles=[Patch(color=OCHRE, label="Key message"),
                    Patch(color=MUTED, label="Context")],
           loc="lower right", frameon=False, ncol=2, fontsize=10.5,
           bbox_to_anchor=(0.98, 0.0))
fig.text(0.02, 0.012,
         "Source: Australian Bureau of Statistics (2022a). Language Statistics for Aboriginal and "
         "Torres Strait Islander Peoples, 2021 (Census).\n"
         "Note: ABS reports 'over 150' languages actively used, 19 used by over 1,000 people; "
         "151 is used as a conservative lower bound.\nCensus counts home use, not fluency.",
         fontsize=9, color=SUBTLE, va="bottom")

fig.subplots_adjust(left=0.15, right=0.97, top=0.78, bottom=0.25)
out = HERE / "figure_language_concentration.png"
fig.savefig(out, dpi=300, facecolor="white")
print(f"Saved {out.name}")
