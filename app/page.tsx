
import { Suspense } from 'react';
import HomeContent from '../components/HomeContent';

function LoadingFallback() {
  return (
    <div className="loading">
      <div>Loading...</div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<LoadingFallback />}>
        <HomeContent />
      </Suspense>
    </main>
  );
}