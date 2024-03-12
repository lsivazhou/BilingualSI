#Load necessary packages
library(tidyverse)
library(lme4)

# Set working directory to directory of script
this.dir <- dirname("/Users/sivazhou/Desktop/BilingualPragmaticProcessing/BilingualSI/data/Pilotdata")
setwd(this.dir)

# Load dataset
raw_data = read.csv("Pilotdata/raw_data.csv")

# Remove unnecessary columns
df = subset(raw_data, select = c("workerid", "proliferate.condition", "correct", "response", "result", "rt", "stimulus") )

# Remove non-trial rows while keeping all trial information
df_trials <- df[grep(".wav", df$stimulus), ]
df_trials <- df_trials[df_trials$stimulus != "audio/kaching.wav", ]
View(df_trials)

# Keeping only non-critical trials (for attention check/exclusion purposes)
df_noncritical_trials <- subset(df_trials, !endsWith(stimulus, "critical.wav"))
# Remove tutorial trials
df_noncritical_trials <- df_noncritical_trials[df_noncritical_trials$result != "", ]
# Remove practice trials
df_noncritical_trials_withoutpractice <- df_noncritical_trials[df_noncritical_trials$correct != "", ]
View(df_noncritical_trials_withoutpractice)

result_counts <- table(df_noncritical_trials_withoutpractice$workerid, df_noncritical_trials_withoutpractice$result)
View(result_counts)
## To exclude participant 107 (didn't do the trials)
## To exclude participant 105, 109, 112 and 121 (answered almost everything "perfectly wrong." Don't know why since they completed practice trails just fine. Three in English_Mandarin_some, one in English_Mandarin_summa)

# Keeping only practice trials (for attention check/exclusion purposes)
df_practice_trials <-df_noncritical_trials[df_noncritical_trials$correct == "",]
View(df_practice_trials)
## To exclude participant 107 (didn't do practice trials)

# Keeping only critical trials
df_critical_trials = subset(df, df$stimulus == "audio/yixie-critical.wav" | df$stimulus == "audio/youxie-critical.wav" | df$stimulus == "audio/some-critical.wav" | df$stimulus == "audio/summa-critical.wav")
# Remove participant data by exclusion criteria
df_critical_trials <- df_critical_trials[!(df_critical_trials$workerid %in% c(105, 107, 109, 112, 121)), ]
View(df_critical_trials)

# Remove critical trials where no response is given -- clean data for analysis
df_critical_trials_analysis <- df_critical_trials[df_critical_trials$response != "",]
View(df_critical_trials_analysis)

write_csv(df_critical_trials_analysis,"critical_data_for_analysis.csv")
write_csv(df_critical_trials,"critical_data_before_exclusion.csv")
write_csv(df_practice_trials,"practice_trials_data.csv")
write_csv(df_noncritical_trials_withoutpractice,"noncritical_trials_data.csv")
