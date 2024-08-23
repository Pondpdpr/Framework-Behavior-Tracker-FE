export async function getFile(path: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}export/${path}`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.status !== 200) {
      throw new Error(res.status as unknown as string);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${path}${new Date().valueOf()}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    throw e;
  }
}
