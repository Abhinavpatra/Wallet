import toast from 'react-hot-toast';

export async function handleCopy (text:string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy the phrase:", error);
      toast.error("Failed to copy the phrase.");
    }
  };