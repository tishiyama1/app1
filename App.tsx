import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import NumerologyCalculator from './components/NumerologyCalculator';
import NumerologyGuide from './components/NumerologyGuide';
import { Calculator, BookOpen, Star } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-10 w-10 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              数秘術相性診断
            </h1>
            <Star className="h-10 w-10 text-pink-500" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            古代から伝わる数秘術で、あなたと相手の相性を診断します。
            誕生日から導き出される生命数を使って、恋愛・友人・家族・ビジネスなど様々な関係性を深く理解しましょう。
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              相性診断
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              数字の意味
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <NumerologyCalculator />
          </TabsContent>
          
          <TabsContent value="guide">
            <NumerologyGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}