const GRAPHICS_BASE = 'https://nobos-clean-img.s3.amazonaws.com/graphics';
const BATHROOM_AMENITIES = `${GRAPHICS_BASE}/bathroom-amenities.png`;
const BATHROOM_SHOWER = `${GRAPHICS_BASE}/bathroom-shower.png`;
const BATHROOM_SINK = `${GRAPHICS_BASE}/bathroom-sink.png`;
const BATHROOM_TOILET = `${GRAPHICS_BASE}/bathroom-toilet.png`;
const CLEANING_BUCKET = `${GRAPHICS_BASE}/cleaning-bucket.png`;
const GARBAGE_RECYCLE = `${GRAPHICS_BASE}/garbage-recycle.png`;
const CONFIRM_SUCCESS = `${GRAPHICS_BASE}/confirm-success.png`;
const CONFIRM_GO_BACK = `${GRAPHICS_BASE}/confirm-go-back.png`;

export const housekeepingTheme = {
  id: 1,
  name: 'Housekeeping',
  colorVariant: 1,
  topics: [
    {
      id: 1,
      name: 'Disinfectant Guide',
      version: 1,
      published: true,
      description: 'todo',
      graphicUrl: BATHROOM_AMENITIES,
      steps: trainingSteps,
    },
    {
      id: 2,
      name: 'Room Linen Guide',
      version: 1,
      published: true,
      description: 'todo',
      graphicUrl: GARBAGE_RECYCLE,
      steps: trainingSteps,
    },
    {
      id: 3,
      name: 'Increased Cleaning Frequencies',
      version: 1,
      published: true,
      description: 'todo',
      graphicUrl: BATHROOM_SHOWER,
      steps: trainingSteps,
    },
  ],
};

export const trainingSteps = [
  {
    step: 1,
    title: "What You'll Need",
    description:
      "To complete a restroom clean, you'll need the following: disinfectant, general cleaner, mop, rags, trash bags, and duster.",
    imageUrl: CLEANING_BUCKET,
  },
  {
    step: 2,
    title: 'Clean Bathroom Sink',
    description:
      'Apply disinfectant to the sink, including fixtures, and make sure to let sit for 45 seconds. Then, clean off thoroughly using a wet rag.',
    imageUrl: BATHROOM_SINK,
  },
  {
    step: 3,
    title: 'Clean Bathroom Toilet',
    description:
      'Apply disinfectant to the toilet (including its base and top), and let sit for 1 minute. Then, clean off thoroughly and dry.',
    imageUrl: BATHROOM_TOILET,
  },
  {
    step: 4,
    title: 'Clean Shower & Tub Area',
    description:
      'Wipe down tub and all shower fixtures using general purpose cleaner. Polish chrome fixtures (shower head and knobs).',
    imageUrl: BATHROOM_SHOWER,
  },
  {
    step: 5,
    title: 'Empty and Clean Trash Receptacles',
    description:
      'Empty trash and recycling bins. Then disinfect both bins and wipe down.',
    imageUrl: GARBAGE_RECYCLE,
  },
  {
    step: 6,
    title: 'Replace Amenities',
    description:
      'Replace shampoo and conditioner, soap, tissues, razor and toothbrush supplies.',
    imageUrl: BATHROOM_AMENITIES,
  },
  {
    confirmCard: true,
    successImageUrl: CONFIRM_SUCCESS,
    goBackImageUrl: CONFIRM_GO_BACK,
  },
];
