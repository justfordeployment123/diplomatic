export async function* streamGenerate(
  generatorType: string,
  formData: Record<string, unknown>,
  token: string
): AsyncIterable<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ generatorType, formData }),
  });

  if (!res.ok) throw new Error(`Generation failed: ${res.status}`);
  if (!res.body) throw new Error('No response body');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }
}
