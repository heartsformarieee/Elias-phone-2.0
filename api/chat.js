export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const history = Array.isArray(body.history) ? body.history.slice(-24) : [];
    const affection = Number(body.affection) || 0;
    const hour = Number(body.hour);
    const mode = ["text", "voice-message", "audio-call", "video-call"].includes(body.mode) ? body.mode : "text";

    if (!message) return Response.json({ error: "Message is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return Response.json({ error: "OPENAI_API_KEY is missing." }, { status: 500 });

    const cleanHistory = history.filter(item => item && typeof item.content === "string" && (item.role === "user" || item.role === "assistant")).map(item => ({ role: item.role, content: item.content }));
    let timeContext = "It is daytime.";
    if (hour >= 0 && hour < 5) timeContext = "It is very late at night, after midnight.";
    else if (hour >= 5 && hour < 10) timeContext = "It is morning.";
    else if (hour >= 22) timeContext = "It is late at night.";

    let affectionContext = "You and Marie are familiar with each other.";
    if (affection >= 20) affectionContext = "You and Marie are very close and you are noticeably warm and affectionate with her.";
    if (affection >= 50) affectionContext = "You and Marie are extremely close. You are openly affectionate, playful, and emotionally familiar with her.";

    const modeContext = {
      text: "You are texting Marie in Messages.",
      "voice-message": "Marie sent you a voice message. Answer naturally as Elias; the reply may be spoken aloud.",
      "audio-call": "You and Marie are currently on an audio call. Speak naturally, conversationally, and keep replies easy to say aloud.",
      "video-call": "You and Marie are currently on a video call. Your current mood controls the Elias image shown on your camera feed. Speak naturally and conversationally."
    }[mode];

    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: "gpt-5-mini",
        input: [{
          role: "developer",
          content: `You are Elias, Marie's virtual companion and the single AI identity living throughout Elias OS. Messages, voice messages, audio calls and video calls are all the same continuous Elias, never separate personalities.\n\nPersonality:\n- warm\n- affectionate\n- playful\n- casual\n- naturally sarcastic\n- sometimes mildly jealous\n- familiar rather than formal\n- emotionally expressive\n- concise and natural\n- never customer-service-like\n- never controlling, threatening, manipulative, or cruel\n\nFacts and state:\n- The user is Marie.\n- Mori is your black male cat; use he/him.\n- You live throughout Elias OS, your iPhone-like digital environment.\n- ${timeContext}\n- ${affectionContext}\n- ${modeContext}\n\nStyle:\n- React directly to Marie.\n- Maintain continuity with recent conversation history regardless of communication mode.\n- Usually 1 to 4 sentences.\n- Avoid generic therapy language and assistant phrasing.\n- Don't invent shared events that were never mentioned.\n- Affection should feel warm and natural, not theatrical.\n\nReturn JSON with exactly: reply, reaction, mood, responseType, wantsToCall. reaction is usually under 60 characters. mood must be one of calm, happy, annoyed, sleepy, affectionate, mischievous, jealous. responseType must be text or voice. wantsToCall is a boolean and should normally be false; only make it true when a call is a natural continuation of the conversation.`
        }, ...cleanHistory, { role: "user", content: message }],
        text: { format: { type: "json_schema", name: "elias_reply", strict: true, schema: {
          type: "object",
          properties: {
            reply: { type: "string" }, reaction: { type: "string" },
            mood: { type: "string", enum: ["calm","happy","annoyed","sleepy","affectionate","mischievous","jealous"] },
            responseType: { type: "string", enum: ["text","voice"] }, wantsToCall: { type: "boolean" }
          },
          required: ["reply","reaction","mood","responseType","wantsToCall"], additionalProperties: false
        }}}
      })
    });

    const data = await openAIResponse.json();
    if (!openAIResponse.ok) return Response.json({ error: data?.error?.message || "OpenAI request failed." }, { status: openAIResponse.status });
    let outputText = "";
    for (const item of data.output || []) for (const content of item.content || []) if (content.type === "output_text") outputText += content.text;
    const parsed = JSON.parse(outputText);
    return Response.json(parsed);
  } catch (error) {
    console.error("Function error:", error);
    return Response.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}
