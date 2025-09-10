import 'jest-extended';
import { InvalidParameterError } from '../../src/core/errors/invalidParameterError';
import { Joueur } from '../../src/core/joueur';

let joueur1 = new Joueur('yvan');

describe('Joueur test', () => {

  it('devrait initialiser un joueur avec un nom', () => {
    const joueur = new Joueur('yvan');
    expect(joueur.nom).toEqual('yvan');
  });

  it('devrait lancer une exception si le nom est vide', () => {
    const n = () => {
      new Joueur('')
    };
    expect(n).toThrow(InvalidParameterError);
    expect(n).toThrow("Le nom ne peut pas être vide")
  })

  it('devrait assainir un nom', () => {
    const joueur = new Joueur('yvan    ');
    expect(joueur.nom).toEqual('yvan');
  });

  it('devrait retourner 0 pour le nombre de lancers au début', () => {
    expect(joueur1.lancers).toEqual(0);
  });

  it('devrait incrémenter le nombre de lancers', () => {
    joueur1.lancer();
    expect(joueur1.lancers).toEqual(1);
    joueur1.lancer();
    expect(joueur1.lancers).toEqual(2);
  });

  it('devrait retourner 0 pour le nombre de lancersGagnes au début', () => {
    expect(joueur1.lancersGagnes).toEqual(0);
  });

  it('devrait incrémenter le nombre de lancersGagnes', () => {
    joueur1.gagner();
    expect(joueur1.lancersGagnes).toEqual(1);
    joueur1.gagner();
    expect(joueur1.lancersGagnes).toEqual(2);
  });

  it('devrait retourner un bon JSON', () => {
    const joueur = new Joueur('yvan');
    expect(joueur.toJSON()).toEqual({ "lancers": 0, "lancersGagnes": 0, "nom": "yvan" });
  });

  it('devrait retourner le bon ratio', () => {
    const joueur = new Joueur('yvan');
    joueur.lancer();
    joueur.lancer();
    if (joueur.lancersGagnes === 2) {
      expect(joueur.ratio()).toEqual(1);
      expect(joueur.lancers).toEqual(2);
    }else if (joueur.lancersGagnes === 1) {
      expect(joueur.ratio()).toEqual(0.5);
      expect(joueur.lancers).toEqual(2);
    } else {
      expect(joueur.ratio()).toEqual(0);
      expect(joueur.lancers).toEqual(2);
    }
  })

});