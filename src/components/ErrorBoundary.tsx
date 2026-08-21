import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Greška u aplikaciji:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center rounded-2xl border border-primary/40 bg-secondary/60 backdrop-blur-sm p-8 shadow-lg">
          <h1 className="font-display text-3xl tracking-wider text-primary mb-3">
            Došlo je do greške
          </h1>
          <p className="text-muted-foreground mb-6">
            Stranica se nije uspjela učitati. Pokušajte ponovno osvježiti.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            Osvježi stranicu
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
