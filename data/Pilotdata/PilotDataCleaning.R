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
View(df)

# Keeping only survey questions -- to measure proficiency & dominance (for exclusion purposes & exploratory analysis on proficiency)
df_participant_backgorund <- df[grep("P0_Q0", df$response), ]
View(df_participant_backgorund)

# Keeping only comments
df_comments <- df[grep("P0_Q1", df$response), ]
View(df_comments)

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

# correct_rejection + hit > 40 to pass the 85% threshold
result_counts <- table(df_noncritical_trials_withoutpractice$workerid, df_noncritical_trials_withoutpractice$result)
View(result_counts)
## To exclude participant 107 (didn't do the trials)
## To exclude participant 105, 109, 112, 121, and 124 (answered almost everything "perfectly wrong." Don't know why since they completed practice trails just fine. Three in English_Mandarin_some, two in English_Mandarin_summa)

# Keeping only practice trials (for attention check/exclusion purposes)
df_practice_trials <-df_noncritical_trials[df_noncritical_trials$correct == "",]
View(df_practice_trials)
## To exclude participant 107 (didn't do practice trials)
## 103 answered over half of the practice trials wrong, but their accuracy of of actual trials is high. Therefore, the data isn't excluded (considering there is a already a lack of power in this pilot)

# Keeping only critical trials
df_critical_trials = subset(df, df$stimulus == "audio/yixie-critical.wav" | df$stimulus == "audio/youxie-critical.wav" | df$stimulus == "audio/some-critical.wav" | df$stimulus == "audio/summa-critical.wav")
# Remove participant data by exclusion criteria
df_critical_trials <- df_critical_trials[!(df_critical_trials$workerid %in% c(105, 107, 109, 112, 121, 124)), ]
View(df_critical_trials)

# Remove critical trials where no response is given -- clean data for analysis
df_critical_trials_analysis <- df_critical_trials[df_critical_trials$response != "",]

# Categorize critical trials
# Language Categorization
df_critical_trials_analysis$Language <- ifelse(df_critical_trials_analysis$stimulus %in% c("audio/yixie-critical.wav", "audio/youxie-critical.wav"), "Chinese",
                          ifelse(df_critical_trials_analysis$stimulus %in% c("audio/some-critical.wav", "audio/summa-critical.wav"), "English", NA))
# Quantifier Categorization
df_critical_trials_analysis$Quantifier <- ifelse(df_critical_trials_analysis$stimulus %in% c("audio/yixie-critical.wav", "audio/some-critical.wav"), "Non-partitive",
                                               ifelse(df_critical_trials_analysis$stimulus %in% c("audio/youxie-critical.wav", "audio/summa-critical.wav"), "Partitive", NA))
# Response Categorization
df_critical_trials_analysis$ResultType <- ifelse(df_critical_trials_analysis$result == "miss", "literal",
                                                 ifelse(df_critical_trials_analysis$result == "correct_rejection", "pragmatic", NA))

View(df_critical_trials_analysis)

write_csv(df_critical_trials_analysis,"critical_data_for_analysis.csv")
write_csv(df_critical_trials,"critical_data_before_exclusion.csv")
write_csv(df_practice_trials,"practice_trials_data.csv")
write_csv(df_noncritical_trials_withoutpractice,"noncritical_trials_data.csv")
write_csv(df_participant_backgorund, "surveys.csv")
write_csv(df_comments, "comments.csv")
