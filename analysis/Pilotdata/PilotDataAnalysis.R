
# Load packages
library(tidyverse)
library(lme4)
library(languageR)
library(brms)
library(lmerTest)
library(ggplot2)
library(dplyr)

# Set working directory to directory of script
this.dir <- dirname("/Users/sivazhou/Desktop/BilingualPragmaticProcessing/BilingualSI/analysis/Pilotdata")
setwd(this.dir)

# Load dataset
critical_data = read.csv("Pilotdata/critical_data_for_analysis.csv")

# Converting response times to log response times 
critical_data$logRT = log(critical_data$rt)

# Categorical levels display
# Converting to factors first
critical_data$Language <- factor(critical_data$Language)
critical_data$Quantifier <- factor(critical_data$Quantifier)
critical_data$ResultType <- factor(critical_data$ResultType)
contrasts(critical_data$Language)
contrasts(critical_data$Quantifier)
contrasts(critical_data$ResultType)

# Response type display
# by quantifier
quantifiertable <- table(critical_data$Quantifier, critical_data$ResultType)
print(quantifiertable)
# by language
languagetable <- table(critical_data$Language, critical_data$ResultType)
print(languagetable)

# Proportion of pragmatic responses by participant
pragmatic_proportion_result <- critical_data %>%
  group_by(workerid, Language, Quantifier) %>%
  summarise(pragmatic_proportion = mean(ResultType == "pragmatic", na.rm = TRUE))

view(pragmatic_proportion_result)

# Calculate margin of error for confidence interval
margin_of_error <- function(data) {
  n <- length(data)
  mean_val <- mean(data)
  se <- sd(data) / sqrt(n)
  margin_of_error <- qnorm(0.975) * se  # 0.975 is the 97.5th percentile of the standard normal distribution for a 95% confidence level
  return(margin_of_error)
}

# Dataframe for proportion of pragmatic responses with 95% confidence interval
pragmatic_proportion_summary = pragmatic_proportion_result %>%
  group_by(Language, Quantifier) %>%
  summarize(pragmatic_proportion_num = mean(pragmatic_proportion), CILow = mean(pragmatic_proportion) - margin_of_error(pragmatic_proportion), CIHigh = mean(pragmatic_proportion) + margin_of_error(pragmatic_proportion)) 

# Visual comparison of proportion of pragmatic responses between quantifiers by language
ggplot(pragmatic_proportion_summary, aes(x = Quantifier, y = pragmatic_proportion_num, fill = Language)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(ymin = CILow, ymax = CIHigh), width = 0.2, position = position_dodge(0.9)) +
  facet_wrap(~ Language) +
  labs(title = "Proportion of Pragmatic Responses by Language", x = "Quantifier", y = "Proportion of Pragmatic Responses", fill = "Language")

# Visual comparison of proportion of pragmatic responses between languages by Quantifier 
ggplot(pragmatic_proportion_summary, aes(x = Language, y = pragmatic_proportion_num, fill = Quantifier)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(ymin = CILow, ymax = CIHigh), width = 0.2, position = position_dodge(0.9)) +
  facet_wrap(~ Quantifier) +
  labs(x = "Language", y = "Proportion of Pragmatic Responses", fill = "Quantifier")
## To be used in prose

# Dataframe for mean raw rt with 95% confidence interval
agr = critical_data %>%
  group_by(Language, ResultType) %>%
  summarize(MeanRT = mean(rt), CILow = mean(rt) - margin_of_error(rt), CIHigh = mean(rt) + margin_of_error(rt)) 

agr_quantifier = critical_data %>%
  group_by(Quantifier, ResultType) %>%
  summarize(MeanRT = mean(rt), CILow = mean(rt) - margin_of_error(rt), CIHigh = mean(rt) + margin_of_error(rt)) 

# Visual comparison of raw rts between result types by language
ggplot(agr, aes(x = ResultType, y = MeanRT, fill = Language)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(ymin = CILow, ymax = CIHigh), width = 0.2, position = position_dodge(0.9)) +
  facet_wrap(~ Language) +
  labs(title = "Mean Response Times by Language", x = "Result Type", y = "Mean RT", fill = "Language")

# Visual comparison of raw rts between result types by quantifier
ggplot(agr_quantifier, aes(x = ResultType, y = MeanRT, fill = Quantifier)) +
  geom_bar(position = "dodge", stat = "identity") +
  geom_errorbar(aes(ymin = CILow, ymax = CIHigh), width = 0.2, position = position_dodge(0.9)) +
  facet_wrap(~ Quantifier) +
  labs(title = "Mean Response Times by Quantifier", x = "Result Type", y = "Mean RT", fill = "Quantifier")

# Centering Quantifier, Language & Result Type
critical_data = critical_data %>%
  mutate(numQuantifier = as.numeric(Quantifier), numLanguage = as.numeric(Language), numResultType = as.numeric(ResultType)) %>%
  mutate(cQuantifier = numQuantifier - mean(numQuantifier),cLanguage = numLanguage - mean(numLanguage), cResultType = numResultType - mean(numResultType))
summary(critical_data)

# Mixed Effects Logistic Regression Model predicting response type with random by-participant intercepts from fixed effects of Quantifier type
logitQuantiferModel = glmer(ResultType ~ cQuantifier + (1|workerid),  data=critical_data, family="binomial")
summary(logitQuantiferModel)
## Intended but limited by power issues: mixed Effects Logistic Regression Model predicting response type with random by-participant intercepts and slope for language type, from fixed effects of Quantifier type

# Mixed Effects Logistic Regression Model predicting response type with random by-participant intercepts and slope for language type, from fixed effects of Language type
logitLanguageModel = glmer(ResultType ~ cLanguage + (1|workerid),  data=critical_data, family="binomial")
summary(logitLanguageModel)
## Intended but limited by power issues: mixed Effects Logistic Regression Model predicting response type with random by-participant intercepts and slope for language type, from fixed effects of Language type

# Mixed Effects Linear Regression Model predicting logrt with random by-participant intercepts from fixed effects of Quantifier type, Result Type and their interaction
linearQuantifierModel = lmer(logRT ~ cResultType*cQuantifier + (1|workerid),  data=critical_data, REML=F)
summary(linearQuantifierModel)
## Intended but limited by power issues: mixed Effects Linear Regression Model predicting logrt with random by-participant intercepts and slope for language type and response type, from fixed effects of Quantifier type, Result Type and their interaction

# Mixed Effects Linear Regression Model predicting logrt with random by-participant intercepts from fixed effects of Language type, Result Type and their interaction
linearLanguageModel = lmer(logRT ~ cResultType*cLanguage + (1|workerid),  data=critical_data, REML=F)
summary(linearLanguageModel)
## Intended but limited by power issues: mixed Effects Linear Regression Model predicting rt with random by-participant intercepts and slope for language type and response type, from fixed effects of Language type, Result Type and their interaction

# On the agenda?
linearLanguageModelexlpore = lmer(logRT ~ cQuantifier*cLanguage + (cQuantifier*cLanguage|workerid),  data=critical_data, REML=F)
summary(linearLanguageModelexlpore)
