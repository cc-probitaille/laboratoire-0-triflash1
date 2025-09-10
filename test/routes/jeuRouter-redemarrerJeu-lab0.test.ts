// Vous devez insérer les nouveaux tests ici
import supertest from 'supertest';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";
import 'jest-extended';

const request = supertest(app);

const testNom1 = 'Jean-Marc';
const testNom2 = 'Pierre';

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it("devrait pouvoir relancer le jeu sans joueurs", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);

  })

  it("devrait rendre 0 pour le nombre de Joueurs", async () => {
      const joueursJSON = jeuRoutes.controleurJeu.joueurs;
      const joueursArray = JSON.parse(joueursJSON);
      expect(joueursArray.length).toBe(0);
    });

  it("devrait ne pas pouvoir se relancer après un redémarrage", async () => {
    const response = await request.get('/api/v1/jeu/jouer/');
    expect(response.status).toBe(404);
  })
})
