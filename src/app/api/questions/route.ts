import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const dbQuestions = await prisma.question.findMany();
    
    // Transform back to the expected original format
    const formattedQuestions = dbQuestions.map(q => ({
      id: q.id,
      text: q.text,
      image: q.image,
      options: {
        A: q.optionA,
        B: q.optionB,
        C: q.optionC,
        D: q.optionD
      },
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      category: q.category
    }));

    return NextResponse.json(formattedQuestions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
