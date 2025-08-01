import { StyleSheet } from 'react-native';
import { colors } from '@/constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdfa', // fondo claro, fresco
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Header con gradiente y patrón semi-transparente encima
  header: {
    height: 280,
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 25,
    position: 'relative',
  },

  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(22, 78, 99, 0.3)', // color overlay azul con transparencia
    zIndex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  profileContent: {
    zIndex: 2,
    alignItems: 'center',
  },

  // Marco con gradiente alrededor de la imagen
  gradientBorder: {
    borderRadius: 80,
    padding: 3,
    backgroundColor: 'transparent',
  },

  profileImageWrapper: {
    borderRadius: 80,
  },

  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#0f766e',
  },

  onlineIndicator: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34d399', // verde brillante para indicador en línea
    zIndex: 5,
  },

  pulse: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34d399',
    opacity: 0.3,
    zIndex: 4,
  },

  userName: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    fontFamily: 'NunitoSans_700Bold', // asumiendo que usas esta fuente
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  location: {
    marginLeft: 6,
    color: '#a7f3d0',
    fontWeight: '600',
    fontSize: 16,
  },


  userUsername: {
    fontSize: 14,
    color: '#d1fae5',
    marginTop: 4,
    fontStyle: 'italic',
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 8,
  },


  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#c7d9d9',
    justifyContent: 'space-between',
  },

  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },

  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBlue,
  },
  
  uploadOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  
  uploadText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  
  errorBanner: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    backgroundColor: colors.warmOrange,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  
  errorText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primaryBlue,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});
