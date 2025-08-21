import { useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";
import type { IAttemptQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttemptQuestionForm;
}) {
  const [result, setResult] = useState<{ score: number; total: number } | null>(
    null
  );

  const defaultValues: IAttemptQuestionForm = { ...questionSet };
  const methods = useForm({ defaultValues });
  const { register, handleSubmit } = methods;

  const onSubmitHandler = (data: IAttemptQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data._id,
      responses: data.questions.map((question) => ({
        questionId: question._id,
        selectedChoicesIds: question.choices
          .filter((choice) => choice.selected)
          .map((ch) => ch._id),
      })),
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setResult(res.data.data);
      })
      .catch(() => {});
  };

  if (result) {
    return (
      <div className="backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center px-8 py-8 mt-10 rounded-xl w-full max-w-3xl mx-auto text-white">
        <p className="text-xl font-semibold text-center mb-4">
          Your Score is {result.score || 0} out of {result.total || 0} questions
          attempted.
        </p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center px-10 py-10 mt-10 rounded-xl w-full max-w-3xl mx-auto text-white">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold">Quiz Title</label>
            <input
              {...register("title")}
              placeholder="Enter Title"
              className="px-3 py-2 rounded-md bg-white/10 border border-white/30 focus:outline-none focus:border-white text-white placeholder-white/70 transition-all duration-300"
            />
          </div>

          <CreateQuestions />

          <button
            type="submit"
            className="mt-4 w-full bg-[#3E5641] hover:bg-cyan-900 text-white px-4 py-2 rounded-md shadow-md transition cursor-pointer text-lg font-semibold"
          >
            Submit Answer
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttemptQuestionForm>();
  const { fields } = useFieldArray({ control, name: "questions" });

  return (
    <div className="flex flex-col gap-6">
      {fields.map((field, index) => (
        <div key={field._id} className="flex flex-col gap-2">
          <p className="text-lg font-semibold">{field.questionText}</p>
          <CreateChoices questionIndex={index} />
        </div>
      ))}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttemptQuestionForm>();
  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <div className="flex flex-col gap-2 pl-4">
      {fields.map((field, index) => (
        <label
          key={field._id}
          className="flex items-center gap-2 cursor-pointer hover:text-cyan-400 transition-all"
        >
          <input
            type="checkbox"
            {...register(
              `questions.${questionIndex}.choices.${index}.selected`
            )}
            className="w-5 h-5 accent-cyan-400"
          />
          <span>{field.text}</span>
        </label>
      ))}
    </div>
  );
}

export default AttemptQuizForm;
