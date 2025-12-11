'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TrendingUp, ArrowRight, Zap, BarChart3, Lock, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-blue-700 backdrop-blur-md bg-blue-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-white">FortuNow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-blue-100 hover:text-white transition"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg transition"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Prédisez le futur
            <span className="block text-blue-300">et gagnez de l'argent réel</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            FortuNow est la plateforme de prédiction où vos prédictions se transforment en profits.
            Pariez sur les événements futurs et constituez votre portefeuille.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center gap-2"
            >
              Démarrer gratuitement
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
            >
              Accédez à votre compte
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Marchés illimités</h3>
            <p className="text-blue-100">
              Accédez à des centaines de marchés dans l'économie, la culture, le climat, et plus encore.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
            <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Gains réels</h3>
            <p className="text-blue-100">
              Gagnez de véritables revenus basés sur la précision de vos prédictions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition">
            <div className="w-12 h-12 bg-purple-400/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sécurisé</h3>
            <p className="text-blue-100">
              Vos données et vos fonds sont protégés par les meilleurs standards de sécurité.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Inscrivez-vous',
                description: 'Créez votre compte en 30 secondes'
              },
              {
                step: '2',
                title: 'Explorez',
                description: 'Découvrez des centaines de marchés'
              },
              {
                step: '3',
                title: 'Pariez',
                description: 'Placez vos paris et attendez les résultats'
              },
              {
                step: '4',
                title: 'Gagnez',
                description: 'Encaissez vos gains réels'
              }
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white mb-2">50K+</p>
            <p className="text-blue-200">Utilisateurs actifs</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">500M€</p>
            <p className="text-blue-200">Volume de paris</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white mb-2">99.9%</p>
            <p className="text-blue-200">Disponibilité garantie</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de prédicteurs et commencez à gagner aujourd'hui.
          </p>
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-2xl transition transform hover:scale-105 inline-flex items-center gap-2"
          >
            S'inscrire gratuitement
            <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-700 mt-16 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-blue-200 text-sm">
          <p>© 2024 FortuNow. Tous les droits réservés.</p>
          <p className="mt-2">Veuillez jouer de manière responsable.</p>
        </div>
      </footer>
    </div>
  );
}
