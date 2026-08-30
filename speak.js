export async function POST(request) {
  try {
    const body = await request.json();
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const mood = typeof body.mood === "string" ? body.mood : "calm";
    if (!text) return Response.json({ error: "Text is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return Response.json({ error: "OPENAI_API_KEY is missing." }, { status: 500 });

    const moodDirection = {
      calm: "Warm, low, relaxed young adult male voice. Natural conversational pace.",
      happy: "Warm young adult male voice, brighter and lightly amused, still natural.",
      annoyed: "Low young adult male voice, dry and mildly annoyed, restrained rather than aggressive.",
      sleepy: "Low, warm, slightly sleepy and soft young adult male voice with an unhurried pace.",
      affectionate: "Low, warm, intimate young adult male voice, gentle and fond without sounding theatrical.",
      mischievous: "Low young adult male voice with a playful, teasing smile in the delivery.",
      jealous: "Low, warm young adult male voice, subtly jealous and dry, never threatening or controlling."
    }[mood] || "Warm, low, relaxed young adult male voice. Natural conversational pace.";

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "cedar",
        input: text.slice(0, 3500),
        instructions: `You are the voice of Elias. ${moodDirection} Avoid announcer, commercial, customer-service, or exaggerated character delivery.`,
        response_format: "mp3"
      })
    });
    if (!response.ok) {
      const detail = await response.text();
      return Response.json({ error: detail || "Voice generation failed." }, { status: response.status });
    }
    return new Response(await response.arrayBuffer(), { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Voice function error:", error);
    return Response.json({ error: error.message || "Voice generation failed." }, { status: 500 });
  }
}
