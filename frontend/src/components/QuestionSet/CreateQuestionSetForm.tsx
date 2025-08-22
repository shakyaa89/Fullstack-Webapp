import axios from "axios";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;
    choices: {
      label: string;
      text: string;
      correctAnswer: boolean;
    }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      {
        questionText: "",
        choices: [],
      },
    ],
  };

  const methods = useForm<QuestionSetForm>({ defaultValues });
  const { register, handleSubmit, reset } = methods;

  const submitHandler = async (data: QuestionSetForm) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:3000/api/admin/questionset/create",
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      alert("Question set created successfully!");
      reset(defaultValues);
    } catch (error) {
      console.error("error => ", error);
      alert("Failed to create question set!");
    }
  };

  return (
    <div className="text-white p-6 max-w-3xl mx-auto">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-6 border border-gray-600 rounded-xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.4)] backdrop-blur-md"
        >
          <div>
            <label htmlFor="title" className="block font-medium mb-2">
              Enter Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter Title"
              className="w-full p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641]"
            />
          </div>

          <CreateQuestions />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#3E5641] hover:bg-[#2d3f30] rounded-lg text-white transition"
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
    name: "questions",
  });

  const addQuestionHandler = () => {
    append({ questionText: "", choices: [] });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Create Questions</h2>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border border-gray-600 rounded-lg space-y-3"
        >
          <div>
            <label className="block font-medium mb-1">Question Text</label>
            <input
              {...register(`questions.${index}.questionText`, {
                required: true,
              })}
              type="text"
              placeholder="Enter Question"
              className="w-full p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641]"
            />
          </div>

          <CreateChoices questionIndex={index} />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-3 py-1 bg-[#3E5641] hover:bg-[#2d3f30] rounded text-white text-sm"
            >
              Remove Question
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestionHandler}
        className="px-4 py-2 bg-[#3E5641] hover:bg-[#2d3f30] rounded text-white"
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
    name: `questions.${questionIndex}.choices`,
  });

  const addChoiceHandler = () => {
    append({
      label: String.fromCharCode(65 + fields.length),
      text: "",
      correctAnswer: false,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Choices</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex items-center gap-3 border border-gray-600 p-2 rounded"
        >
          <input
            {...register(
              `questions.${questionIndex}.choices.${index}.correctAnswer`
            )}
            type="checkbox"
            className="w-5 h-5 accent-[#3E5641]"
          />

          <span className="text-gray-300 w-6 text-center font-semibold">
            {String.fromCharCode(65 + index)}.
          </span>

          <input
            {...register(`questions.${questionIndex}.choices.${index}.text`, {
              required: true,
            })}
            type="text"
            placeholder="Choice text"
            className="flex-1 p-2 rounded border border-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3E5641]"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="px-2 py-1 bg-[#3E5641] hover:bg-[#2d3f30] rounded text-white text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addChoiceHandler}
        className="px-3 py-1 bg-[#3E5641] hover:bg-[#2d3f30] rounded text-white text-sm"
      >
        Add Choice
      </button>
    </div>
  );
}

export default CreateQuestionSetForm;
