type apiRequestProps = {
  url?: string;
  optObj?: RequestInit | null;
};

const apiRequest = async ({ url = "", optObj = null }: apiRequestProps) => {
  try {
    const response = await fetch(url, optObj || undefined);
    if (!response.ok) throw new Error("unable to connect with the server");

    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

export default apiRequest;
