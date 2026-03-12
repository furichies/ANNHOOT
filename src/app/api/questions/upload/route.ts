import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();
    let questionsData;

    try {
      questionsData = JSON.parse(text);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON file' }, { status: 400 });
    }

    if (!Array.isArray(questionsData)) {
      return NextResponse.json({ error: 'JSON must contain an array of questions' }, { status: 400 });
    }

    // Basic validation of the format before insertion
    for (const q of questionsData) {
      if (!q.text || !q.options || !q.correctAnswer) {
        return NextResponse.json({ error: 'Invalid question format in JSON' }, { status: 400 });
      }
    }

    // Delete existing questions to replace with the new ones
    await prisma.question.deleteMany();

    // Insert new questions
    const createdQuestions = await prisma.$transaction(
        questionsData.map(q => {
             return prisma.question.create({
                 data: {
                    text: q.text,
                    image: q.image || null,
                    optionA: q.options.A,
                    optionB: q.options.B,
                    optionC: q.options.C,
                    optionD: q.options.D,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation || '',
                    category: q.category || 'General',
                 }
             })
        })
    );

    return NextResponse.json({ success: true, count: createdQuestions.length });

  } catch (error) {
    console.error('Error uploading questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
