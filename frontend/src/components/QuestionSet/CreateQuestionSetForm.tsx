import React from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

interface QuestionSetForm {
  title: string;
  question: {
    questionText: string;
    correctAnswer: string;
    choices: {
      label: string;
      text: string;
    }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    question: [
      {
        questionText: "",
        correctAnswer: "",
        choices: [],
      },
    ],
  };

  const methods = useForm({ defaultValues });
  const { watch, register } = methods;

  console.log("form values => ", watch());

  return (
    <div className="min-h-screen text-white p-6">
      <FormProvider {...methods}>
        <form className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-lg font-semibold">
              Enter Title
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter Title"
              className="w-full px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <CreateQuestions />

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-md border border-white hover:text-black hover:bg-white transition"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { register, control } = useFormContext<QuestionSetForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "question",
  });

  function addQuestionHandler() {
    append({
      questionText: "",
      correctAnswer: "",
      choices: [],
    });
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Create Questions</h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border border-gray-500 rounded-md space-y-4"
        >
          <div>
            <label className="block mb-1">Question Text</label>
            <input
              {...register(`question.${index}.questionText`)}
              type="text"
              placeholder="Enter Question"
              className="w-full px-4 py-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <CreateChoices questionIndex={index} />

          <div className="text-right">
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-400 hover:text-red-500 text-sm"
            >
              Remove Question
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestionHandler}
        className="px-4 py-2 mt-2 rounded-md border border-white hover:bg-white hover:text-black transition"
      >
        Add Question
      </button>
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `question.${questionIndex}.choices`,
  });

  function addChoiceHandler() {
    append({ label: "", text: "" });
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Choices</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col sm:flex-row sm:items-center gap-2"
        >
          <input
            {...register(`question.${questionIndex}.choices.${index}.label`)}
            type="text"
            placeholder="Label"
            className="flex-1 px-3 py-2 rounded-md border border-gray-500 focus:outline-none"
          />
          <input
            {...register(`question.${questionIndex}.choices.${index}.text`)}
            type="text"
            placeholder="Text"
            className="flex-1 px-3 py-2 rounded-md border border-gray-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 hover:text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addChoiceHandler}
        className="mt-2 px-3 py-1 rounded-md border border-white hover:bg-white hover:text-black transition text-sm"
      >
        Add Choice
      </button>
    </div>
  );
}

export default CreateQuestionSetForm;
