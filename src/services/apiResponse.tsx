type apiResponseProps = {
  url?: string;
  optObj?: RequestInit | null;
};

const apiResponse = async ({ url = "", optObj = null }: apiResponseProps) => {
  try {
    const response = await fetch(url, optObj || undefined);
    if (!response.ok) throw new Error("unable to connect with the server");

    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

export default apiResponse;
