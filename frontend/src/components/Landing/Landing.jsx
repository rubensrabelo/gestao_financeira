import { Link } from "react-router-dom";
import Button from "../UI/Button";
import ThemeToggle from "../UI/ThemeToggle";

function Landing() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Theme Toggle */}
            <div className="fixed top-4 right-4 z-10">
                <ThemeToggle />
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
                {/* Hero Section */}
                <div className="animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-bounce-in">
                        Controle suas 
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            {" "}Finanças
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
                        Gerencie suas receitas e despesas de forma inteligente e organize sua vida financeira com nossa plataforma moderna
                    </p>
                    
                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Dashboard Intuitivo</h3>
                            <p className="text-white/80 text-sm">Visualize seus dados financeiros com gráficos e relatórios detalhados</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Controle Total</h3>
                            <p className="text-white/80 text-sm">Organize receitas e despesas por categorias personalizáveis</p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Seguro & Confiável</h3>
                            <p className="text-white/80 text-sm">Seus dados protegidos com as melhores práticas de segurança</p>
                        </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                        <Link to="/register">
                            <Button 
                                variant="primary" 
                                size="lg"
                                className="w-full sm:w-auto shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Começar Agora
                            </Button>
                        </Link>
                        
                        <Link to="/login">
                            <Button 
                                variant="secondary" 
                                size="lg"
                                className="w-full sm:w-auto bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-md"
                            >
                                Já tenho conta
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">1000+</div>
                            <div className="text-white/70 text-sm">Usuários Ativos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">50k+</div>
                            <div className="text-white/70 text-sm">Transações</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">98%</div>
                            <div className="text-white/70 text-sm">Satisfação</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;