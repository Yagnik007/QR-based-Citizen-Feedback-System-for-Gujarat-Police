import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StartRatings from "../Assets/startRatings";
import EmojiRating from "react-emoji-rating";
import { questions1, questions2 } from "../constants/questions1";
import { useTranslation, initReactI18next } from "react-i18next";
import EmojiChooser from "./EmojiChooser";

const Feedback = ({
  onFinalSubmit,
  Questions,
  setQuestions,
  rating,
  setRating,
  review,
  setReview,
  emojis,
  setEmojis,
  loader,
  setLoader,
}) => {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = () => {
    if (step === 2) {
      onFinalSubmit("test");
      return;
    }
    setStep((step) => step + 1);
    // setQuestions({ ...Questions, firstQ, secondQ, thirdQ });
  };

  const onRBSubmit = (res) => {
    // console.log("dropdown bhai", res);
    setQuestions({ res });
    handleNext();
  };

  const handleRating1 = (emojiRating) => {
    // console.log("emoj", emojiRating);
    setEmojis([...emojis, emojiRating]);
  };
  const handleRating2 = (emojiRating) => {
    setEmojis([...emojis, emojiRating]);
    // console.log("emoj", emojiRating);
  };
  const handleRating3 = (emojiRating) => {
    setEmojis([...emojis, emojiRating]);
    // console.log("emoj", emojiRating);
  };
  const handleRating4 = (emojiRating) => {
    setEmojis([...emojis, emojiRating]);
    // console.log("emoj", emojiRating);
  };

  const { t } = useTranslation();
  const renderCurrentFeedbackForm = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <>
            {questions1.map((item) => (
              <div className="question_container">
                <p>{t(item.q)}</p>
                {item.options.map((option) => (
                  <div className="option">
                    <input
                      type="radio"
                      className="input"
                      name={item.name}
                      id="ques"
                      value={option.label}
                      {...register(item.name, { required: true })}
                    />
                    <label htmlFor="ques">{t(option.label)}</label>
                  </div>
                ))}
              </div>
            ))}
          </>
        );
      case 1:
        return (
          <>
            {questions2.map((item) => (
              <div className="question_container">
                <p>{t(item.q)}</p>
                {item.options.map((option) => (
                  <div className="option">
                    <input
                      type="radio"
                      className="input"
                      name={item.name}
                      id="ques"
                      value={option.label}
                      {...register(item.name, { required: true })}
                    />
                    <label htmlFor="ques">{t(option.label)}</label>
                  </div>
                ))}
              </div>
            ))}

            <div className="question_container">
              <p className="special">{t("Q. What was your conflict ?")}</p>
              <input
                type="text"
                className="input"
                name="conflicts"
                id=""
                {...register("conflicts", { required: true })}
                placeholder="Kindly explain your conflict in brief .."
              />
            </div>
            <div className="question_container stars">
              <p>Give Us a Rating.</p>

              <StartRatings rating={rating} setRating={setRating} />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <EmojiChooser />
            <div className="textarea">
              <label htmlFor="">Review : </label>
              <textarea
                id=""
                name="review"
                rows="5"
                cols="50"
                className="textarea-input"
                // {...register("review", { required: true })}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Please review your experience in 300 characters.."
              ></textarea>
              {/* <EmojiRating variant="classic" onChange={handleEmoji} /> */}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="data_container">
      <div className="data_container_wrap">
        <div className="heading_auth">
          <h2>{t("Feedback Form")}</h2>
          <hr className="hr" />
          <p>{t("Kindly enter the required fields of the form.")}</p>
        </div>

        <form onSubmit={handleSubmit(onRBSubmit)}>
          <div className="questions_container">
            {renderCurrentFeedbackForm(step)}
          </div>
          <a href="#">
            <button type="submit" className="next button">
              {step === 2
                ? loader
                  ? t("Submitting........")
                  : t("Final Submit")
                : t("Next")}
            </button>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
